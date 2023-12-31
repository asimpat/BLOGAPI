import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './schema/auth.schema';
import { RegisterDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly authmodel: Model<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async getEmail(username: string) {
    const newEmail = await this.authmodel.findOne({ username: username });
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
    const newEmail = await this.getEmail(loginUser.username);

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

    const payload = { usermane: newEmail.username, sub: newEmail._id };

    const token = this.jwtService.sign(payload);
    return { user: { newEmail, token } };
  }
}
