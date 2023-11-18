import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/auth/dtos/decorator/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/schema/auth.schema';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findCurrentUser(@User() { username }: Auth) {
    return await this.userService.findByUsername(username);
  }
}
