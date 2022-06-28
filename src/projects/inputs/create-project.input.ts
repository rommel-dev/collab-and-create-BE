import { InputType, Field, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  projectName: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => [String], { nullable: true })
  techStacks?: string[];

  @Field((type) => [String], { nullable: true })
  unconfirmMembers?: string[];
}
