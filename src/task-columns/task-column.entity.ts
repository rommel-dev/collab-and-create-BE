import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/user.entity';
import { Task } from 'src/tasks/task.entity';

@ObjectType()
@Schema({ timestamps: true })
export class TaskColumn {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  columnName: string;

  @Field(() => Number)
  @Prop()
  sequence: number;

  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: MongooseSchema.Types.ObjectId | User;

  @Field(() => [Task])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Task.name })
  tasks: [MongooseSchema.Types.ObjectId] | Task[];

  @Field(() => Date, { description: 'Created At' })
  @Prop()
  createdAt: Date;

  @Field(() => Date, { description: 'Updated At' })
  @Prop()
  updatedAt: Date;
}

export type TaskColumnDocument = TaskColumn & Document;
export const TaskColumnSchema = SchemaFactory.createForClass(TaskColumn);
