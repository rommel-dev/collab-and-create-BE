import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ForgotPasswordInput {
  @Field()
  email?: string;

  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  password?: string;
}
