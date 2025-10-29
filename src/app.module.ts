import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ });
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.BD_USER,
      password: process.env.BD_PASS,
      database: process.env.BD_NAME
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
