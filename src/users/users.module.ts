import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfileController } from './profile/profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/auth/schema/auth.schema';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
     PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UsersController, ProfileController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
