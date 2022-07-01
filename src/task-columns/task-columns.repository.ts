import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskColumn, TaskColumnDocument } from './task-column.entity';
import { ObjectId } from 'mongoose';
import { FindTaskColumnsInput } from './inputs/find-task-columns.input';
import { CreateTaskColumnInput } from './inputs/create-task-column.input';
import { User } from 'src/users/user.entity';
import { EditTaskColumnInput } from './inputs/edit-task-column.input';

@Injectable()
export class TaskColumnsRepository {
  constructor(
    @InjectModel(TaskColumn.name)
    private taskColumnModel: Model<TaskColumnDocument>,
  ) {}

  async getById(_id: ObjectId) {
    return await this.taskColumnModel.findById(_id).exec();
  }

  async find(input: FindTaskColumnsInput) {
    return await this.taskColumnModel.find({ _id: { $in: input._ids } });
  }

  async save(input: CreateTaskColumnInput, user: User) {
    const newTaskColumn = new this.taskColumnModel({
      ...input,
      createdBy: user._id,
    });
    return await newTaskColumn.save();
  }

  async edit(input: EditTaskColumnInput) {
    return await this.taskColumnModel.findOneAndUpdate(
      { _id: input._id },
      { ...input },
      { new: true },
    );
  }
}
