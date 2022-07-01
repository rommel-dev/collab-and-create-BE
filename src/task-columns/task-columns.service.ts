import { Injectable } from '@nestjs/common';
import { TaskColumnsRepository } from './task-columns.repository';
import { ObjectId } from 'mongoose';
import { FindTaskColumnsInput } from './inputs/find-task-columns.input';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateTaskColumnInput } from './inputs/create-task-column.input';
import { User } from 'src/users/user.entity';
import { EditTaskColumnInput } from './inputs/edit-task-column.input';

@Injectable()
export class TaskColumnsService {
  constructor(
    private readonly taskColumnsRepository: TaskColumnsRepository,
    private readonly projectsService: ProjectsService,
  ) {}

  async taskColumnById(_id: ObjectId) {
    return await this.taskColumnsRepository.getById(_id);
  }

  async getTaskColumns(input: FindTaskColumnsInput) {
    try {
      if (input.projectId) {
        const project = await this.projectsService.projectById(input.projectId);

        if (!project) throw new Error(`No project found`);
        const taskColumns = await this.taskColumnsRepository.find({
          _ids: [...(project.taskColumns as ObjectId[])],
        });
        return taskColumns;
      }
      return await this.taskColumnsRepository.find({
        _ids: [...(input._ids as ObjectId[])],
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async createTaskColumn(input: CreateTaskColumnInput, user: User) {
    const { columnName, projectId } = input;
    try {
      const project = await this.projectsService.projectById(projectId);
      if (!project) throw new Error(`No project found`);
      const sequence = project.taskColumns.length + 1;
      const newTaskColumn = await this.taskColumnsRepository.save(
        { ...input, sequence },
        user,
      );
      await this.projectsService.editProject(
        {
          _id: project._id,
          taskColumns: [...project.taskColumns, newTaskColumn._id],
        },
        user,
      );
      return newTaskColumn;
    } catch (err) {
      throw new Error(err);
    }
  }

  async editTaskColumn(input: EditTaskColumnInput) {
    try {
      return await this.taskColumnsRepository.edit(input);
    } catch (err) {
      throw new Error(err);
    }
  }
}
