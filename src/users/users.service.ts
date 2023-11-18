import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/auth/schema/auth.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Auth') private readonly authmodel: Model<Auth>) {}

  async findByUsername(username: string): Promise<Auth> {
    return await this.authmodel.findOne({ username: username });
  }
}
