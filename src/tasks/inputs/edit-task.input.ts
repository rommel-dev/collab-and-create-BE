import { InputType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class EditTaskInput {
  @Field(() => String)
  _id: ObjectId;

  @Field({ nullable: true })
  description?: string;
}
