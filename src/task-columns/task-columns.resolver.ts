import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CurrentUser } from 'src/authentication/user.decorator';
import { User } from 'src/users/user.entity';
import { TaskColumn } from './task-column.entity';
import { TaskColumnsService } from './task-columns.service';

@Resolver()
export class TaskColumnsResolver {
  constructor(private readonly taskColumnsService: TaskColumnsService) {}

  //   @Query((returns) => [TaskColumn])
  @Query((returns) => String)
  @UseGuards(JwtAuthGuard)
  async taskColumnsByProject(@Args('input') input: string) {
    return this.taskColumnsService.taskColumnsByProject(input);
  }
}
