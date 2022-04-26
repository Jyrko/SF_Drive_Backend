import "reflect-metadata";
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MONGODB_PASSWORD } from './constants';

import {AuthModule} from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import { MessagesModule } from './messages/messages.module';


//export const MONGO_CONNECTION = "mongodb+srv://nestuser:yourpassword@your-mongo-db-url?retryWrites=true&w=majority"

const uri = "mongodb+srv://mongouser%3AFYkjhvajHRivuFASdgkuyF%40clusterlearn.eo7u8.mongodb.net?retryWrites=true&w=majority";
const uri2 = "mongodb+srv://mongouser%3AFYkjhvajHRivuFASdgkuyF%40clusterlearn.eo7u8.mongodb.net/users-db?retryWrites=true&w=majority"

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: "/files"
    }),
    TypeOrmModule.forRoot({
      name: "default",
      type: "mongodb",
      host: uri2,
      database: "users-db",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      entities: [
        `${__dirname}/**/*.entity.{ts,js}`,
      ]
    }),
    AuthModule,
    CarsModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



// //localhost setup
// TypeOrmModule.forRoot({
//   name: "default",
//   type: "mongodb",
//   host: "localhost",
//   port: 27017,
//   database: "users-db",
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   entities: [
//     `${__dirname}/**/*.entity.{ts,js}`,
//   ]
// }),
