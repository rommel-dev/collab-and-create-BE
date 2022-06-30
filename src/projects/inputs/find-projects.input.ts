import { InputType, Field, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class FindProjectsInput {
  @Field(() => [String], { nullable: true })
  _ids?: string[];

  @Field(() => [String], { nullable: true })
  confirmedMembers?: string[];

  @Field(() => [String], { nullable: true })
  unconfirmMembers?: string[];
}
