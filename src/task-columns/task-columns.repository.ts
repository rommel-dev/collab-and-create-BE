import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskColumn, TaskColumnDocument } from './task-column.entity';

@Injectable()
export class TaskColumnsRepository {
  constructor(
    @InjectModel(TaskColumn.name)
    private taskColumnModel: Model<TaskColumnDocument>,
  ) {}

  async find(input: string) {
    // return await this.taskColumnModel.find({
    //   confirmedMembers: { $all: [user._id] },
    // });
    return 'Test';
  }
}
