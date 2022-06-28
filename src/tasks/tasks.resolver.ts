import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { TasksService } from './tasks.service';

@Resolver()
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  //   @Query((returns) => [TaskColumn])
  @Query((returns) => String)
  @UseGuards(JwtAuthGuard)
  async tasksByColumn(@Args('input') input: string) {
    return 'Test';
  }
}
