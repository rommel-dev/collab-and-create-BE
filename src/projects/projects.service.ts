import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { CreateProjectInput } from './inputs/create-project.input';
import { Project } from './project.entity';
import { ProjectsRepository } from './projects.repository';
import { Schema as MongooseSchema } from 'mongoose';
import { FindProjectsInput } from './inputs/find-projects.input';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  projectById(_id: MongooseSchema.Types.ObjectId) {
    return this.projectsRepository.getById(_id);
  }

  async projectsByUser(user: User) {
    try {
      const projects = await this.projectsRepository.findProjectsByUser(user);
      if (!projects) {
        throw new Error(`No projects found`);
      }
      return projects;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findUnconfirmProjects(user: User) {
    try {
      const projects = await this.projectsRepository.findUnconfirmProjects(
        user,
      );
      if (!projects) {
        throw new Error(`No projects found`);
      }
      return projects;
    } catch (err) {
      throw new Error(err);
    }
  }

  async createProject(input: CreateProjectInput, user: User) {
    try {
      const projects = await this.projectsRepository.findProjectsByUser(user);
      const findProject = projects.find(
        (project: Project) => project.projectName === input.projectName,
      );
      if (findProject) {
        throw new Error(`Project name already exists`);
      }
      return await this.projectsRepository.save(input, user);
    } catch (err) {
      throw new Error(err);
    }
  }
}
