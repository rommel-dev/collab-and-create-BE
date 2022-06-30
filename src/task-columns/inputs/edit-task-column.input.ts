import { InputType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class EditTaskColumnInput {
  @Field(() => String)
  _id: ObjectId;

  @Field({ nullable: true })
  columnName?: string;

  @Field(() => Number, { nullable: true })
  sequence?: number;

  @Field(() => [String], { nullable: true })
  tasks?: ObjectId[];
}
