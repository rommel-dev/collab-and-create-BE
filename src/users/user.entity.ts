import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  password: string;

  @Field()
  @Prop()
  code: string;

  @Field({ nullable: true })
  @Prop()
  image?: string;

  @Field(() => Date, { description: 'Created At' })
  @Prop()
  createdAt?: Date;

  @Field(() => Date, { description: 'Updated At' })
  @Prop()
  updatedAt?: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
