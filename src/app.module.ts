import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Autopista } from './entities/autopista.entity';
import { Peaje } from './entities/peaje.entity';
import { Ciudad } from './entities/ciudad.entity';

dotenv.config({ });
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.BD_USER,
      password: process.env.BD_PASS,
      database: process.env.BD_NAME,
      entities: [
        Autopista,
        Ciudad,
        Peaje,
      ]
    }),
    TypeOrmModule.forFeature([ Autopista, Peaje, ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
