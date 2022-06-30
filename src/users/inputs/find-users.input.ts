import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema, ObjectId } from 'mongoose';

@InputType()
export class FindUsersInput {
  @Field(() => [String], { nullable: true })
  _ids?: ObjectId[];
}
