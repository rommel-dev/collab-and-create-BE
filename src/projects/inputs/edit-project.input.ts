import { InputType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class EditProjectInput {
  @Field(() => String)
  _id: ObjectId;

  @Field({ nullable: true })
  inviteAction?: 'accept' | 'reject';

  @Field(() => [String], { nullable: true })
  taskColumns?: ObjectId[];
}
