import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Model } from 'mongoose';
import { User } from 'src/users/user.entity';
import { CreateProjectInput } from './inputs/create-project.input';
import { Project, ProjectDocument } from './project.entity';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.projectModel.findById(_id).exec();
  }

  async findProjectsByUser(user: User) {
    return await this.projectModel.find({
      confirmedMembers: { $in: [user._id] },
    });
  }

  async findUnconfirmProjects(user: User) {
    return await this.projectModel.find({
      unconfirmedMembers: { $in: [user._id] },
    });
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
