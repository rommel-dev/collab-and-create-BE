import { InputType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class CreateTaskColumnInput {
  @Field()
  columnName: string;

  @Field(() => String, { nullable: true })
  projectId?: ObjectId;

  @Field(() => Number, { nullable: true })
  sequence?: number;
}
