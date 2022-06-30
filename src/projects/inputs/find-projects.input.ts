import { InputType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class FindProjectsInput {
  @Field(() => [String], { nullable: true })
  _ids?: ObjectId[];

  @Field(() => [String], { nullable: true })
  confirmedMembers?: ObjectId[];

  @Field(() => [String], { nullable: true })
  unconfirmMembers?: ObjectId[];
}
