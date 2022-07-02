import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';
import { Task } from 'src/tasks/task.entity';
import { Project } from 'src/projects/project.entity';
import { User } from 'src/users/user.entity';

@ObjectType()
@Schema({ timestamps: true })
export class Notification {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: User.name })
  notifiedUsers: [ObjectId] | User[];

  @Field(() => Project, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Project.name })
  project: ObjectId | Project;

  @Field(() => Task, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Task.name })
  task: ObjectId | Task;

  @Field({ nullable: true })
  @Prop()
  status: string;

  @Field(() => Date, { description: 'Created At' })
  @Prop()
  createdAt: Date;

  @Field(() => Date, { description: 'Updated At' })
  @Prop()
  updatedAt: Date;
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
