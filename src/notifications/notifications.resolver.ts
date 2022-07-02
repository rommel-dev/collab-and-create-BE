import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CurrentUser } from 'src/authentication/user.decorator';
import { Notification, NotificationDocument } from './notification.entity';
import { NotificationsService } from './notifications.service';
import { ObjectId } from 'mongoose';
import { User } from 'src/users/user.entity';
import { CreateNotificationInput } from './inputs/create-notification.input';
import { Project } from 'src/projects/project.entity';
import { Task } from 'src/tasks/task.entity';

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  //#######################
  //####### QUERIES #######
  //#######################
  @Query(() => Notification)
  @UseGuards(JwtAuthGuard)
  async getNotification(@Args('_id', { type: () => String }) _id: ObjectId) {
    return this.notificationsService.notificationById(_id);
  }

  @Query(() => [Notification])
  @UseGuards(JwtAuthGuard)
  async getNotifications(@CurrentUser() user: User) {
    return this.notificationsService.getNotifications(user);
  }

  //#######################
  //###### MUTATIONS ######
  //#######################
  @Mutation(() => Notification)
  @UseGuards(JwtAuthGuard)
  async createNotification(@Args('input') input: CreateNotificationInput) {
    return await this.notificationsService.createNotification(input);
  }

  //#######################
  //###### SUBFIELDS ######
  //#######################
  @ResolveField()
  async notifiedUsers(
    @Parent() notification: NotificationDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await notification.populate({ path: 'notifiedUsers', model: User.name });

    return notification.notifiedUsers;
  }

  @ResolveField()
  async project(
    @Parent() notification: NotificationDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await notification.populate({ path: 'project', model: Project.name });

    return notification.project;
  }

  @ResolveField()
  async task(
    @Parent() notification: NotificationDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await notification.populate({ path: 'task', model: Task.name });

    return notification.task;
  }
}
