import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
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

@Resolver(() => TaskColumn)
export class TaskColumnsResolver {
  constructor(private readonly taskColumnsService: TaskColumnsService) {}

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

  @Mutation(() => TaskColumn)
  @UseGuards(JwtAuthGuard)
  async createTaskColumn(
    @Args('input') input: CreateTaskColumnInput,
    @CurrentUser() user: User,
  ) {
    return await this.taskColumnsService.createTaskColumn(input, user);
  }

  @Mutation(() => TaskColumn)
  @UseGuards(JwtAuthGuard)
  async editTaskColumn(@Args('input') input: EditTaskColumnInput) {
    return await this.taskColumnsService.editTaskColumn(input);
  }

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
