import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/user.entity';
import { TaskColumn } from 'src/task-columns/task-column.entity';

@ObjectType()
@Schema({ timestamps: true })
export class Project {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  projectName: string;

  @Field()
  @Prop()
  description: string;

  @Field()
  @Prop()
  status: string;

  @Field(() => [String])
  @Prop()
  techStacks: string[];

  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: MongooseSchema.Types.ObjectId | User;

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  unconfirmedMembers: [MongooseSchema.Types.ObjectId] | User[];

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  confirmedMembers: [MongooseSchema.Types.ObjectId] | User[];

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  rejectedInviteMembers: [MongooseSchema.Types.ObjectId] | User[];

  @Field(() => [TaskColumn])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: TaskColumn.name })
  taskColumns: [MongooseSchema.Types.ObjectId] | TaskColumn[];

  // TODO
  //   @Field((type) => [NoteCategory])
  //   @Prop({
  //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: NoteCategory.name }],
  //   })
  //   noteCategories: NoteCategory[];

  @Field(() => Date, { description: 'Created At' })
  @Prop()
  createdAt: Date;

  @Field(() => Date, { description: 'Updated At' })
  @Prop()
  updatedAt: Date;
}

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
