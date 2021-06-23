import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import {AuthModule} from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: "default",
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "users-db",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [
        `${__dirname}/**/*.entity.{ts,js}`,
      ]
    }),
    AuthModule    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
