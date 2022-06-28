import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { User } from 'src/users/user.entity';
import { SendMailInput } from './inputs/send-mail.input';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(input: SendMailInput, user: User) {
    console.log(input, user);
    const response = await this.mailerService.sendMail({
      to: user.email,
      from: 'Collab&Create Help Service <collab.and.create@gmail.com>', // override default from
      subject: 'Forgot Password',
      template: 'test',
      context: {
        name: user.name,
        code: input.code,
      },
    });
    if (response.accepted.length) {
      return 'Successfully sent the email';
    } else {
      throw new ApolloError('Something went wrong while sending on your email');
    }
  }
}
