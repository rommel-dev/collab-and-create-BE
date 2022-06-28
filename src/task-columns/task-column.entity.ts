import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/user.entity';
import { Project } from 'src/projects/project.entity';
import { Task } from 'src/tasks/task.entity';

@ObjectType()
@Schema({ timestamps: true })
export class TaskColumn {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  columnName: string;

  @Field((type) => Number)
  @Prop()
  sequence: number;

  @Field((type) => User)
  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: User.name },
  })
  createdBy: User;

  // @Field((type) => Project)
  // @Prop({
  //   type: { type: mongoose.Schema.Types.ObjectId, ref: Project.name },
  // })
  // project: Project;

  @Field((type) => [Task])
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Task.name }],
  })
  tasks: Task[];

  @Field(() => Date, { description: 'Created At' })
  @Prop()
  createdAt?: Date;

  @Field(() => Date, { description: 'Updated At' })
  @Prop()
  updatedAt?: Date;
}

export type TaskColumnDocument = TaskColumn & Document;
export const TaskColumnSchema = SchemaFactory.createForClass(TaskColumn);
