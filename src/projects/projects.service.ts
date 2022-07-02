import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { CreateProjectInput } from './inputs/create-project.input';
import { Project } from './project.entity';
import { ProjectsRepository } from './projects.repository';
import { ObjectId } from 'mongoose';
import { EditProjectInput } from './inputs/edit-project.input';
import { FindProjectsInput } from './inputs/find-projects.input';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async projectById(_id: ObjectId) {
    return await this.projectsRepository.getById(_id);
  }

  async getProjects(user: User) {
    try {
      const confirmedProjects = await this.projectsRepository.find({
        confirmedMembers: user._id,
      });
      const unconfirmedProjects = await this.projectsRepository.find({
        unconfirmedMembers: user._id,
      });
      if (!confirmedProjects && !unconfirmedProjects) {
        throw new Error(`No projects found`);
      }
      return [...confirmedProjects, ...unconfirmedProjects];
    } catch (err) {
      throw new Error(err);
    }
  }

  async createProject(input: CreateProjectInput, user: User) {
    try {
      const projects = await this.projectsRepository.find({
        confirmedMembers: user._id,
      });
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

  async editProject(input: EditProjectInput, user: User) {
    try {
      const project = await this.projectById(input._id);
      if (!project) {
        throw new Error(`Unable to find project`);
      }
      if (input.inviteAction === 'accept') {
        return await this.projectsRepository.edit({
          ...input,
          confirmedMembers: [...project.confirmedMembers, user._id],
          unconfirmedMembers: [
            ...(project.unconfirmedMembers as ObjectId[]).filter(
              (m: ObjectId) => m != user._id,
            ),
          ],
        });
      }
      if (input.inviteAction === 'reject') {
        return await this.projectsRepository.edit({
          ...input,
          rejectedInviteMembers: [...project.rejectedInviteMembers, user._id],
          unconfirmedMembers: [
            ...(project.unconfirmedMembers as ObjectId[]).filter(
              (m: ObjectId) => m != user._id,
            ),
          ],
        });
      }
      return await this.projectsRepository.edit(input);
    } catch (err) {
      throw new Error(err);
    }
  }
}
