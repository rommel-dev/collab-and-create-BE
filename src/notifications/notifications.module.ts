import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './notification.entity';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [
    NotificationsResolver,
    NotificationsService,
    NotificationsRepository,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
