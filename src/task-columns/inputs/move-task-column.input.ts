import { InputType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class MoveTaskColumnInput {
  @Field(() => [String])
  _ids: ObjectId[];

  @Field(() => String)
  projectId: ObjectId;
}
