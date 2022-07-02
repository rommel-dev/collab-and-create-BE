import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { Project, ProjectSchema } from './project.entity';
import { ProjectsRepository } from './projects.repository';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    NotificationsModule,
  ],
  providers: [ProjectsResolver, ProjectsService, ProjectsRepository],
  exports: [ProjectsService],
})
export class ProjectsModule {}
