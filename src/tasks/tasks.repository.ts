import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/users/user.entity';
import { CreateTaskInput } from './inputs/create-task.input';
import { EditTaskInput } from './inputs/edit-task.input';
import { FindTasksInput } from './inputs/find-tasks.input';
import { Task, TaskDocument } from './task.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
  ) {}

  async getById(_id: ObjectId) {
    return await this.taskModel.findById(_id).exec();
  }

  async find(input: FindTasksInput) {
    return await this.taskModel.find(input);
  }

  async save(input: CreateTaskInput, user: User) {
    const newTask = new this.taskModel({
      ...input,
      createdBy: user._id,
    });
    return await newTask.save();
  }

  async edit(input: EditTaskInput) {
    return await this.taskModel.findOneAndUpdate(
      { _id: input._id },
      { ...input },
      { new: true },
    );
  }
}
