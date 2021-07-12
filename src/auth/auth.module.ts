import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthFilesService } from './auth-files.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

import {User} from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "jsfdjlksdjflkjsdlkfj",
      signOptions: { expiresIn: '1d' }
    }),
    MulterModule.register({
      dest: './files'
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthFilesService],
})
export class AuthModule {}
