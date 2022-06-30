import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';
import { Team } from 'src/team/team.entity';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  _id: ObjectId;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  password: string;

  @Field()
  @Prop()
  code: string;

  @Field({ nullable: true })
  @Prop()
  photo: string;

  @Field(() => [String], { nullable: true })
  @Prop()
  skills: string[];

  @Field({ nullable: true })
  @Prop()
  portfolio: string;

  @Field(() => Boolean)
  @Prop()
  verified: boolean;

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: User.name })
  colleagues: [ObjectId] | User[];

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: User.name })
  myPendingInvitesRequest: [ObjectId] | User[];

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: User.name })
  myPendingInvitesRespond: [ObjectId] | User[];

  @Field(() => [Team])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Team.name })
  verifiedTeams: [ObjectId] | Team[];

  @Field(() => [Team])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Team.name })
  unverifiedTeams: [ObjectId] | Team[];

  @Field(() => Date, { description: 'Created At' })
  @Prop()
  createdAt?: Date;

  @Field(() => Date, { description: 'Updated At' })
  @Prop()
  updatedAt?: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
