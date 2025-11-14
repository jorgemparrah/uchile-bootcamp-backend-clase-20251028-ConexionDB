import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Autopista } from './entities/autopista.entity';
import { Peaje } from './entities/peaje.entity';
import { Ciudad } from './entities/ciudad.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoController } from './mongo.controller';
import { MongoService } from './mongo.service';
import { Autopista as AutopistaMongo, AutopistaSchema } from './schemas/autopista.schema';
import { Peaje as PeajeMongo, PeajeSchema } from './schemas/peaje.schema';

dotenv.config({ });
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_BD_USER}:${process.env.MONGO_BD_PASS}@${process.env.MONGO_BD_HOST}:${process.env.MONGO_BD_PORT}/${process.env.MONGO_BD_NAME}`),
    MongooseModule.forFeature([{
      name: AutopistaMongo.name, schema: AutopistaSchema
    },{
      name: PeajeMongo.name, schema: PeajeSchema
    }]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_BD_USER,
      password: process.env.POSTGRES_BD_PASS,
      database: process.env.POSTGRES_BD_NAME,
      entities: [
        Autopista,
        Ciudad,
        Peaje,
      ]
    }),
    /*
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
    */
    TypeOrmModule.forFeature([ Autopista, Peaje, ]),
  ],
  controllers: [AppController, MongoController],
  providers: [AppService, MongoService],
})
export class AppModule {}
