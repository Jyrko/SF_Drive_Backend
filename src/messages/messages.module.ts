import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { MessageEntity } from './entity/message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

import { AuthMiddleware } from '../middlewares/auth.middleware';
import { JWT_REG_OBJECT } from '../constants';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    JwtModule.register(JWT_REG_OBJECT),
    AuthModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService, AuthService],
})

export class MessagesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(AuthMiddleware)
      .forRoutes("/messages");
    }
}
