import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { FindUserInput } from './inputs/find-user.input';
import { SigninInput } from './inputs/signin.input';
import { SignupInput } from './inputs/signup.input';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async signup(input: SignupInput) {
    try {
      const isUser = await this.findUser({
        email: input.email,
      });
      if (isUser) {
        return new Error('Email already exists 🤡');
      } else {
        input.password = await bcrypt.hash(input.password, 10).then((r) => r);
        return await this.saveUser(input);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async signin(input: SigninInput) {
    const { email, password } = input;
    try {
      const user = await this.findUser({ email });
      if (!user) {
        return new Error('Invalid credentials 🤡');
      }
      const match = await this.authenticationService.validateUser(
        password,
        user.password,
      );
      if (match) {
        return this.authenticationService.generateUserCredentials(user);
      } else {
        return new Error('Invalid credentials 🤡');
      }
    } catch (err) {
      console.error(err);
    }
  }

  async findUser(input: FindUserInput) {
    try {
      const res = await this.userRepository.findUser(input);
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  async saveUser(input: CreateUserInput) {
    try {
      const res = await this.userRepository.saveUser(input);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
}
