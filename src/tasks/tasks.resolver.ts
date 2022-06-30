import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CurrentUser } from 'src/authentication/user.decorator';
import { User } from 'src/users/user.entity';
import { CreateTaskInput } from './inputs/create-task.input';
import { EditTaskInput } from './inputs/edit-task.input';
import { FindTasksInput } from './inputs/find-tasks.input';
import { Task, TaskDocument } from './task.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => Task)
  @UseGuards(JwtAuthGuard)
  async getTask(@Args('_id', { type: () => String }) _id: ObjectId) {
    return this.tasksService.taskById(_id);
  }

  @Query(() => [Task])
  @UseGuards(JwtAuthGuard)
  async getTasks(@Args('input') input: FindTasksInput) {
    return this.tasksService.getTasks(input);
  }

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Args('input') input: CreateTaskInput,
    @CurrentUser() user: User,
  ) {
    return await this.tasksService.createTask(input, user);
  }

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  async editTask(@Args('input') input: EditTaskInput) {
    return await this.tasksService.editTask(input);
  }

  @ResolveField()
  async createdBy(
    @Parent() task: TaskDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate) await task.populate({ path: 'createdBy', model: User.name });
    return task.createdBy;
  }
}
