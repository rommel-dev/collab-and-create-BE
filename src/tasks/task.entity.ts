import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/user.entity';
import { Project } from 'src/projects/project.entity';
import { TaskColumn } from 'src/task-columns/task-column.entity';

@ObjectType()
@Schema({ timestamps: true })
export class Task {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  description: string;

  @Field((type) => User)
  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: User.name },
  })
  createdBy: User;

  // @Field((type) => TaskColumn)
  // @Prop({
  //   type: { type: mongoose.Schema.Types.ObjectId, ref: TaskColumn.name },
  // })
  // taskColumn: TaskColumn;

  // @Field((type) => Project)
  // @Prop({
  //   type: { type: mongoose.Schema.Types.ObjectId, ref: Project.name },
  // })
  // project: Project;

  @Field((type) => [User])
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }],
  })
  inCharge: User[];

  @Field(() => Date, { description: 'Created At' })
  @Prop()
  createdAt?: Date;

  @Field(() => Date, { description: 'Updated At' })
  @Prop()
  updatedAt?: Date;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
