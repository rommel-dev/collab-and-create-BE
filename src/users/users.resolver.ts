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

@Resolver()
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
    console.log(input);
    return await this.userService.forgotPassword(input);
  }

  @Query((returns) => User)
  // @UseGuards(JwtAuthGuard)
  async findUser(
    @Args('input') input: FindUserInput,
    @CurrentUser() user: User,
  ) {
    console.log(input);
    return this.userService.findUser(input);
  }
}
