import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CurrentUser } from 'src/authentication/user.decorator';
import { FindUserInput } from './inputs/find-user.input';
import { ForgotPasswordInput } from './inputs/forgot-password.input';
import { SigninInput } from './inputs/signin.input';
import { SignupInput } from './inputs/signup.input';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Schema as MongooseSchema } from 'mongoose';
import { FindUsersInput } from './inputs/find-users.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  async signup(@Args('input') input: SignupInput) {
    return await this.userService.signup(input);
  }

  @Mutation(() => String)
  async signin(@Args('input') input: SigninInput) {
    return await this.userService.signin(input);
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Args('input') input: ForgotPasswordInput) {
    return await this.userService.forgotPassword(input);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async findUser(@Args('input') input: FindUserInput) {
    return this.userService.findUser(input);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async myInfo(@CurrentUser() user: User) {
    return this.userService.myInfo(user._id);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async findUsers(@Args('input') input: FindUsersInput) {
    return this.userService.findUsers(input);
  }
}
