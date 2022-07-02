import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateNotificationInput } from './inputs/create-notification.input';
import { Notification, NotificationDocument } from './notification.entity';

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async getById(_id: ObjectId) {
    return await this.notificationModel.findById(_id).exec();
  }

  async find(user: any) {
    return await this.notificationModel.find({ notifiedUsers: user._id });
  }

  async save(input: CreateNotificationInput) {
    const newNotification = new this.notificationModel({
      ...input,
    });
    return await newNotification.save();
  }
}
