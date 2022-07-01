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
import { CreateProjectInput } from './inputs/create-project.input';
import { Project, ProjectDocument } from './project.entity';
import { ProjectsService } from './projects.service';
import { ObjectId } from 'mongoose';
import { EditProjectInput } from './inputs/edit-project.input';
import { TaskColumn } from 'src/task-columns/task-column.entity';
import { FindProjectsInput } from './inputs/find-projects.input';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => Project)
  @UseGuards(JwtAuthGuard)
  async getProject(@Args('_id', { type: () => String }) _id: ObjectId) {
    return this.projectsService.projectById(_id);
  }

  @Query(() => [Project])
  @UseGuards(JwtAuthGuard)
  async getProjects(
    @Args('input') input: FindProjectsInput,
    @CurrentUser() user: User,
  ) {
    return this.projectsService.getProjects(input, user);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  async createProject(
    @Args('input') input: CreateProjectInput,
    @CurrentUser() user: User,
  ) {
    return await this.projectsService.createProject(input, user);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  async inviteResponse(
    @Args('input') input: EditProjectInput,
    @CurrentUser() user: User,
  ) {
    return await this.projectsService.editProject(input, user);
  }

  @ResolveField()
  async createdBy(
    @Parent() project: ProjectDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await project.populate({ path: 'createdBy', model: User.name });

    return project.createdBy;
  }

  @ResolveField()
  async confirmedMembers(
    @Parent() project: ProjectDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await project.populate({ path: 'confirmedMembers', model: User.name });

    return project.confirmedMembers;
  }

  @ResolveField()
  async unconfirmedMembers(
    @Parent() project: ProjectDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await project.populate({ path: 'unconfirmedMembers', model: User.name });

    return project.unconfirmedMembers;
  }

  @ResolveField()
  async taskColumns(
    @Parent() project: ProjectDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await project.populate({ path: 'taskColumns', model: TaskColumn.name });

    return project.taskColumns;
  }
}
