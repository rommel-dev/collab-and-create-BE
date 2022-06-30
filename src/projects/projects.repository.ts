import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/users/user.entity';
import { CreateProjectInput } from './inputs/create-project.input';
import { EditProjectInput } from './inputs/edit-project.input';
import { Project, ProjectDocument } from './project.entity';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async getById(_id: ObjectId) {
    return this.projectModel.findById(_id).exec();
  }

  async find(input: any) {
    return await this.projectModel.find(input);
  }

  async edit(input: any) {
    return await this.projectModel.findOneAndUpdate(
      { _id: input._id },
      { ...input },
      { new: true },
    );
  }

  async save(input: CreateProjectInput, user: User) {
    const newProject = new this.projectModel({
      ...input,
      status: 'ongoing',
      confirmedMembers: [user._id],
      createdBy: user._id,
    });
    return await newProject.save();
  }
}
