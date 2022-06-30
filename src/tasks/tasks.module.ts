import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskColumnsModule } from 'src/task-columns/task-columns.module';
import { Task, TaskSchema } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    TaskColumnsModule,
  ],
  providers: [TasksResolver, TasksService, TasksRepository],
})
export class TasksModule {}
