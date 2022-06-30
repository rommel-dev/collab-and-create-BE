import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { TaskColumnsService } from 'src/task-columns/task-columns.service';
import { User } from 'src/users/user.entity';
import { CreateTaskInput } from './inputs/create-task.input';
import { EditTaskInput } from './inputs/edit-task.input';
import { FindTasksInput } from './inputs/find-tasks.input';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly taskColumnsService: TaskColumnsService,
  ) {}

  async taskById(_id: ObjectId) {
    return await this.tasksRepository.getById(_id);
  }

  async getTasks(input: FindTasksInput) {
    try {
      if (input.taskColumnId) {
        const taskColumn = await this.taskColumnsService.taskColumnById(
          input.taskColumnId,
        );
        if (!taskColumn) throw new Error(`No column found`);
        return await this.tasksRepository.find({
          _ids: [...(taskColumn.tasks as ObjectId[])],
        });
      }
      return await this.tasksRepository.find({
        _ids: [...(input._ids as ObjectId[])],
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async createTask(input: CreateTaskInput, user: User) {
    const { description, taskColumnId } = input;
    try {
      const taskColumn = await this.taskColumnsService.taskColumnById(
        taskColumnId,
      );
      if (!taskColumn) throw new Error(`No project found`);
      const newTask = await this.tasksRepository.save({ description }, user);
      await this.taskColumnsService.editTaskColumn({
        _id: taskColumn._id,
        tasks: [...taskColumn.tasks, newTask._id],
      });
      return newTask;
    } catch (err) {
      throw new Error(err);
    }
  }

  async editTask(input: EditTaskInput) {
    try {
      return await this.tasksRepository.edit(input);
    } catch (err) {
      throw new Error(err);
    }
  }
}
