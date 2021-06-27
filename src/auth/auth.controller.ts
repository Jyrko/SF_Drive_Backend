import { Controller, Get, Post, Body, BadRequestException, Res, Req, UnauthorizedException, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { STORAGE_MULTER_CONFIG } from '../constants';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {Response, Request} from 'express';
import { ObjectId } from 'mongodb';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService
    ) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('register')
  @UseInterceptors(
    FileFieldsInterceptor([
        {name: 'file', maxCount: 1},
        {name: 'profileImage', maxCount: 1},
        {name: 'documentPhotos', maxCount: 5}

    ], STORAGE_MULTER_CONFIG)
  )
  async register(
    @UploadedFiles() files,
    @Body() params,
    @Res({passthrough: true}) response: Response
    ) {

    const hashedPassword = await bcrypt.hash(params.password, 12);

    const user = await this.authService.createUser({
      name: params.name,
      email: params.email,
      birthday: params.birthday,
      passport: params.passport,
      license: params.license,
      password: hashedPassword
    })

    delete user.password;

    return user;
  }

  @Post('login')
  async login(
    @Body() params,
    @Res({passthrough: true}) response: Response) {
    const user = await this.authService.findOne({email: params.email})
    console.log(params);
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!await bcrypt.compare(params.password, user.password)) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({id: user._id});

    response.cookie('jwt', jwt, {httpOnly: true})

    return {
      message: 'success'
    };
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.authService.findOne({_id: new ObjectId(data.id)});

      const {password, ...result} = user;

      return result;

    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('jwt');

    return {
      message: "success"
    }
  }
}
