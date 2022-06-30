import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from 'src/projects/projects.module';
import { TaskColumn, TaskColumnSchema } from './task-column.entity';
import { TaskColumnsRepository } from './task-columns.repository';
import { TaskColumnsResolver } from './task-columns.resolver';
import { TaskColumnsService } from './task-columns.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskColumn.name, schema: TaskColumnSchema },
    ]),
    ProjectsModule,
  ],
  providers: [TaskColumnsResolver, TaskColumnsService, TaskColumnsRepository],
  exports: [TaskColumnsService],
})
export class TaskColumnsModule {}
