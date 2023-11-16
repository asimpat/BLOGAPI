import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BlogsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
