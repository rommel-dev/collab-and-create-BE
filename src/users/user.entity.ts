import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: string;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  password: string;

  @Field({ nullable: true })
  @Prop()
  image?: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
