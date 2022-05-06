import { Controller, Get, Post, Body, BadRequestException, Res, Req, UnauthorizedException, UseInterceptors, UploadedFiles, Param } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { STORAGE_MULTER_CONFIG } from '../constants';
import { AuthService } from './auth.service';
import { AuthFilesService } from './auth-files.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {Response} from 'express';
// import { ObjectID } from 'typeorm';
import { ObjectID } from 'mongodb';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFilesService: AuthFilesService,
    private jwtService: JwtService
    ) {}

  @Get()
  getHello(): string {
    return "Hello World, ";
  }

  @Post('register')
  @UseInterceptors(
    FileFieldsInterceptor([
        {name: 'file', maxCount: 1},
        {name: 'profileImage', maxCount: 1},

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

    this.authFilesService.createUserFolder(String(user._id));

    const jwt = await this.jwtService.signAsync({id: user._id});

    return {
      ...user,
      accessToken: jwt,
      message: "success"
    };
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

    return {
      message: 'success',
      accessToken: jwt
    };
  }

  @Post('user')
  async user(@Body() params) {
    console.log(params);
    try {
      const accessToken = params.accessToken;
      const data = await this.jwtService.verifyAsync(accessToken);
      console.log("Loging access token and data");
      console.log(accessToken);
      console.log(data);

      if (!data) {
        console.log("No data")
        throw new UnauthorizedException();
      }

      console.log("Before authentication");
      const user = await this.authService.findOne({_id: new ObjectID(data.id)});

      const {password, ...result} = user;

      return {...result, message: "success"};

    } catch (e) {
      console.log("Token verification exception: " + e);
      throw new UnauthorizedException();
    }
  }

  @Get("/user/basic-info/:id")
  async getUserBasicInfo(
    @Param() params
  ) {
    console.log("Basic-info, user id - " + params.id);
    const user = await this.authService.findOne({_id: new ObjectID(params.id)});
    const filename = this.authFilesService.findUserImagePath(params.id);
    const {password, birthdate, passport, license, ...result} = user;
    return {
      ...result,
      profileImage: `/files/users/${params.id}/${filename}`
    };
  }

  @Get("/user/get-image/:id")
  gerUserImage(
    @Param() params
  ) {
    console.log("Get-image, user id - " + params.id);
    const filename = this.authFilesService.findUserImagePath(params.id);
    return {
      profileImage: `/files/users/${params.id}/${filename}`
    }
  }
}
