import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendMailInput {
  @Field()
  code?: string;
}
