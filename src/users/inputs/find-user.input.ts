import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindUserInput {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  email?: string;
}
