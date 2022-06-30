import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { FindUserInput } from './inputs/find-user.input';
import { SigninInput } from './inputs/signin.input';
import { SignupInput } from './inputs/signup.input';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { ForgotPasswordInput } from './inputs/forgot-password.input';
import { MailService } from 'src/mail/mail.service';
import { User } from './user.entity';
import { Schema as MongooseSchema } from 'mongoose';
import { FindUsersInput } from './inputs/find-users.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly authenticationService: AuthenticationService,
    private readonly mailService: MailService,
  ) {}

  async signup(input: SignupInput) {
    try {
      const isUser = await this.findUser({
        email: input.email,
      });
      if (isUser) {
        throw new UserInputError('Email already exists');
      } else {
        const code = Math.floor(Math.random() * 8999 + 1000);
        input.password = await bcrypt.hash(input.password, 10).then((r) => r);
        await this.mailService.sendMail(
          { code: code.toString() },
          { email: input.email, name: input.email },
          'verify-email',
          'Email Verification',
        );
        return await this.saveUser({
          ...input,
          photo:
            'https://res.cloudinary.com/rommel/image/upload/v1601204560/tk58aebfctjwz7t74qya.jpg',
        });
      }
    } catch (err) {
      throw new UserInputError(err);
    }
  }

  async signin(input: SigninInput) {
    const { email, password } = input;
    try {
      const user = await this.findUser({ email });
      if (!user) {
        throw new AuthenticationError('Please check you login credentials 1');
      }
      const match = await this.authenticationService.validateUser(
        password,
        user.password,
      );
      if (match) {
        return this.authenticationService.generateUserCredentials(user);
      } else {
        throw new AuthenticationError('Please check you login credentials 2');
      }
    } catch (err) {
      throw new AuthenticationError(err);
    }
  }

  async forgotPassword(input: ForgotPasswordInput) {
    const { email, code, password } = input;
    try {
      const user = await this.findUser({ email });
      if (!user) {
        throw new UserInputError('User not found');
      }

      if (code) {
        if (user.code !== code) {
          throw new UserInputError('Wrong verification code');
        }

        return true;
      } else if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);

        await this.userRepository.updateUser({
          email: user.email,
          password: hashedPassword,
        });

        return true;
      } else {
        const code = Math.floor(Math.random() * 8999 + 1000);

        await this.userRepository.updateUser({
          email: user.email,
          code: code.toString(),
        });

        await this.mailService.sendMail(
          { code: code.toString() },
          user,
          'reset-password',
          'Forgot Password',
        );

        return true;
      }
    } catch (err) {
      throw new UserInputError(err);
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

  async findUser(input: FindUserInput) {
    try {
      const res = await this.userRepository.findUser(input);
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  async myInfo(_id: string) {
    try {
      const res = await this.userRepository.findUser({ _id });
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  async findUsers(input: FindUsersInput) {
    try {
      const res = await this.userRepository.findUsers(input);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
}
