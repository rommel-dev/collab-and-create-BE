import { InputType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { User } from 'src/users/user.entity';

@InputType()
export class CreateNotificationInput {
  @Field(() => [String], { nullable: true })
  notifiedUsers?: ObjectId[] | User[];

  @Field(() => String, { nullable: true })
  project?: ObjectId;

  @Field(() => String, { nullable: true })
  task?: ObjectId;

  @Field({ nullable: true })
  status?: string;
}
