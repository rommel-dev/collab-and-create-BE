import { InputType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class CreateTaskInput {
  @Field()
  description: string;

  @Field(() => [String], { nullable: true })
  inCharge?: ObjectId[];

  @Field(() => String, { nullable: true })
  taskColumnId?: ObjectId;
}
