import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { ObjectId } from 'mongoose';
import { User } from 'src/users/user.entity';
import { CreateNotificationInput } from './inputs/create-notification.input';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async notificationById(_id: ObjectId) {
    return await this.notificationsRepository.getById(_id);
  }

  async getNotifications(user: User) {
    try {
      const notifications = await this.notificationsRepository.find(user);

      if (!notifications) {
        throw new Error(`No notifications found`);
      }
      return notifications;
    } catch (err) {
      throw new Error(err);
    }
  }

  async createNotification(input: CreateNotificationInput) {
    try {
      return await this.notificationsRepository.save(input);
    } catch (err) {
      throw new Error(err);
    }
  }
}
