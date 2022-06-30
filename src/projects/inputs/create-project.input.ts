import { InputType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class CreateProjectInput {
  @Field()
  projectName: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  techStacks?: string[];

  @Field(() => [String], { nullable: true })
  unconfirmMembers?: ObjectId[];
}
