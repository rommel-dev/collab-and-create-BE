import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FindUsersInput {
  @Field(() => [String], { nullable: true })
  _ids?: string[];
}
