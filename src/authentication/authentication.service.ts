import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private jwtTokenService: JwtService) {}

  async validateUser(password: string, hashedPassword: string): Promise<any> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async generateUserCredentials(user: User) {
    const payload = {
      email: user.email,
      _id: user._id,
    };
    return this.jwtTokenService.sign(payload);
  }
}
