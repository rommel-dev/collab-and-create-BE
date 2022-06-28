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
import { User, UserDocument } from 'src/users/user.entity';
import { CreateProjectInput } from './inputs/create-project.input';
import { Project, ProjectDocument } from './project.entity';
import { ProjectsService } from './projects.service';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query((returns) => Project)
  @UseGuards(JwtAuthGuard)
  async project(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.projectsService.projectById(_id);
  }

  @Query((returns) => [Project])
  @UseGuards(JwtAuthGuard)
  async projects(@CurrentUser() user: User) {
    return this.projectsService.projectsByUser(user);
  }

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  async createProject(
    @Args('input') input: CreateProjectInput,
    @CurrentUser() user: User,
  ) {
    return await this.projectsService.createProject(input, user);
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
  async createdBy(
    @Parent() project: ProjectDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await project.populate({ path: 'createdBy', model: User.name });

    return project.createdBy;
  }
}
