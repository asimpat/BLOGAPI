import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { config } from 'dotenv';
import { ConfigModule } from '@nestjs/config';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }), 
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DB_URL,
      }),
    }),
  ],
})
export class DatabaseModule {}
