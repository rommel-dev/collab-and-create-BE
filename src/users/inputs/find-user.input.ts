import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema, ObjectId } from 'mongoose';

@InputType()
export class FindUserInput {
  @Field(() => String, { nullable: true })
  _id?: ObjectId;

  @Field({ nullable: true })
  email?: string;
}
