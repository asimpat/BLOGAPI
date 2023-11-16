import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './schema/auth.schema';
import { RegisterDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Auth') private readonly authmodel: Model<Auth>) {}

  async getEmail(email: string) {
    const newEmail = await this.authmodel.findOne({ email: email });
    return newEmail;
  }

  async register(user: RegisterDto): Promise<Auth> {
    const newEmail = await this.getEmail(user.email);

    if (newEmail) {
      throw new UnauthorizedException('user already exist');
    }
    const hashPassword = await bcrypt.hash(user.password, 10);

    const newUser = new this.authmodel({
      email: user.email,
      username: user.username,
      password: hashPassword,
    });

    return newUser.save();
  }

  async login(loginUser: LoginDto) {
    const newEmail = await this.getEmail(loginUser.email);

    if (!newEmail) {
      return { msg: `user does not exist` };
    }
    const isPasswordValid = await bcrypt.compare(
      loginUser.password,
      newEmail.password,
    );
    if (!isPasswordValid) {
      return { msg: `Invalid credential` };
    }
    return newEmail;
  }
}
