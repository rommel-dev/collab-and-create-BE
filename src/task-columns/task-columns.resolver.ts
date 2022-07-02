import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CurrentUser } from 'src/authentication/user.decorator';
import { User } from 'src/users/user.entity';
import { TaskColumn, TaskColumnDocument } from './task-column.entity';
import { TaskColumnsService } from './task-columns.service';
import { ObjectId } from 'mongoose';
import { CreateTaskColumnInput } from './inputs/create-task-column.input';
import { FindTaskColumnsInput } from './inputs/find-task-columns.input';
import { EditTaskColumnInput } from './inputs/edit-task-column.input';
import { Task } from 'src/tasks/task.entity';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSubEngine } from 'graphql-subscriptions';
import { MoveTaskColumnInput } from './inputs/move-task-column.input';

const CREATED_TASK_COLUMN_EVENT = 'createdTaskColumn';
const MOVED_TASK_COLUMN_EVENT = 'movedTaskColumn';

@Resolver(() => TaskColumn)
export class TaskColumnsResolver {
  constructor(
    private readonly taskColumnsService: TaskColumnsService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine, // @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  //#######################
  //####### QUERIES #######
  //#######################
  @Query(() => TaskColumn)
  @UseGuards(JwtAuthGuard)
  async getTaskColumn(@Args('_id', { type: () => String }) _id: ObjectId) {
    return this.taskColumnsService.taskColumnById(_id);
  }

  @Query(() => [TaskColumn])
  @UseGuards(JwtAuthGuard)
  async getTaskColumns(@Args('input') input: FindTaskColumnsInput) {
    return this.taskColumnsService.getTaskColumns(input);
  }

  //#######################
  //###### MUTATIONS ######
  //#######################
  @Mutation(() => TaskColumn)
  @UseGuards(JwtAuthGuard)
  async createTaskColumn(
    @Args('input') input: CreateTaskColumnInput,
    @CurrentUser() user: User,
  ) {
    const result = await this.taskColumnsService.createTaskColumn(input, user);
    await this.pubSub.publish(CREATED_TASK_COLUMN_EVENT, {
      createdTaskColumn: result,
    });
    return result.newTaskColumn;
  }

  @Mutation(() => TaskColumn)
  @UseGuards(JwtAuthGuard)
  async editTaskColumn(@Args('input') input: EditTaskColumnInput) {
    return await this.taskColumnsService.editTaskColumn(input);
  }

  @Mutation(() => [TaskColumn])
  @UseGuards(JwtAuthGuard)
  async moveTaskColumn(@Args('input') input: MoveTaskColumnInput) {
    const result = await this.taskColumnsService.moveTaskColumn(input);
    await this.pubSub.publish(MOVED_TASK_COLUMN_EVENT, {
      movedTaskColumn: result,
    });
    return result.movedTaskColumns;
  }

  //#######################
  //#### SUBSCRIPTIONS ####
  //#######################
  @Subscription(() => TaskColumn, {
    name: CREATED_TASK_COLUMN_EVENT,
    filter: (payload, variables) => {
      return payload.createdTaskColumn.confirmedMembers.some(
        (m: any) => m == variables.userId,
      );
    },
    resolve: (value) => {
      return value.createdTaskColumn.newTaskColumn;
    },
  })
  createdTaskColumn(@Args('userId') userId: string) {
    return this.pubSub.asyncIterator(CREATED_TASK_COLUMN_EVENT);
  }

  @Subscription(() => [TaskColumn], {
    name: MOVED_TASK_COLUMN_EVENT,
    filter: (payload, variables) => {
      return payload.movedTaskColumn.confirmedMembers.some(
        (m: any) => m == variables.userId,
      );
    },
    resolve: (value) => {
      return value.movedTaskColumn.movedTaskColumns;
    },
  })
  movedTaskColumn(@Args('userId') userId: string) {
    return this.pubSub.asyncIterator(MOVED_TASK_COLUMN_EVENT);
  }

  //#######################
  //###### SUBFIELDS ######
  //#######################
  @ResolveField()
  async createdBy(
    @Parent() taskColumn: TaskColumnDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await taskColumn.populate({ path: 'createdBy', model: User.name });
    return taskColumn.createdBy;
  }

  @ResolveField()
  async tasks(
    @Parent() taskColumn: TaskColumnDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await taskColumn.populate({ path: 'tasks', model: Task.name });
    return taskColumn.tasks;
  }
}
