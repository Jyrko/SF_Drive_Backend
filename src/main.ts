import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    credentials: true
  });

  // app.useStaticAssets(join(__dirname,  '../files'));
  // app.use("/files", express.static("files"));

  await app.listen(8000);
}
bootstrap();
