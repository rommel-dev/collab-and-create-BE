import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';
import { User } from 'src/users/user.entity';
import { TaskColumn } from 'src/task-columns/task-column.entity';

@ObjectType()
@Schema({ timestamps: true })
export class Project {
  @Field(() => String)
  _id: ObjectId;

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
  createdBy: ObjectId | User;

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  unconfirmedMembers: [ObjectId] | User[];

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  confirmedMembers: [ObjectId] | User[];

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  rejectedInviteMembers: [ObjectId] | User[];

  @Field(() => [TaskColumn])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: TaskColumn.name })
  taskColumns: [ObjectId] | TaskColumn[];

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
