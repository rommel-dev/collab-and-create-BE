import { InputType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class FindTaskColumnsInput {
  @Field(() => [String], { nullable: true })
  _ids?: ObjectId[];

  @Field(() => String, { nullable: true })
  projectId?: ObjectId;
}
