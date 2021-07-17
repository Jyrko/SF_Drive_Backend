import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthFilesService } from './auth-files.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';

import {User} from './entities/user.entity';

import { JWT_REG_OBJECT } from '../constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      dest: './files'
    }),
    JwtModule.register(JWT_REG_OBJECT),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthFilesService],
})
export class AuthModule {}
