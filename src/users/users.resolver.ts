import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CurrentUser } from 'src/authentication/user.decorator';
import { FindUserInput } from './inputs/find-user.input';
import { SigninInput } from './inputs/signin.input';
import { SignupInput } from './inputs/signup.input';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  async register(@Args('input') input: SignupInput) {
    try {
      return await this.userService.signup(input);
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => String)
  async login(@Args('input') input: SigninInput) {
    try {
      return await this.userService.signin(input);
    } catch (err) {
      console.error(err);
    }
  }

  @Query((returns) => User)
  @UseGuards(JwtAuthGuard)
  async findUser(
    @Args('input') input: FindUserInput,
    @CurrentUser() user: User,
  ) {
    return this.userService.findUser(input);
  }
}
