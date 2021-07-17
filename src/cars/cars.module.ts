import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { JwtModule } from '@nestjs/jwt';

import { AuthMiddleware } from '../middlewares/auth.middleware';

import { JWT_REG_OBJECT } from '../constants';
import { CarsRepository } from './repositories/cars.repository';

@Module({
  imports: [
    JwtModule.register(JWT_REG_OBJECT)
  ],
  controllers: [CarsController],
  providers: [CarsService, CarsRepository]
})
export class CarsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(AuthMiddleware)
      .forRoutes("/cars");
    }
}
