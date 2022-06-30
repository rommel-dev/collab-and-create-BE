import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';
import { User } from 'src/users/user.entity';

@ObjectType()
@Schema({ timestamps: true })
export class Task {
  @Field(() => String)
  _id: ObjectId;

  @Field()
  @Prop()
  description: string;

  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: ObjectId | User;

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  inCharge: [ObjectId] | User[];

  @Field(() => Date, { description: 'Created At' })
  @Prop()
  createdAt: Date;

  @Field(() => Date, { description: 'Updated At' })
  @Prop()
  updatedAt: Date;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
