import { Body, Controller, Get, Param, Post, Query, Res, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CarsService } from './cars.service';
import { STORAGE_MULTER_CONFIG_CARS } from '../constants';
import { CarFilesService } from "./car-files.service";

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly carFilesService: CarFilesService
  ) {}
  @Get()
  getHello() {
    return "Hello World!"
  }

  @Post('/add-car')
  @UseInterceptors(
    FileFieldsInterceptor([
      {name: 'carPhotos', maxCount: 10},
      {name: 'documentPhotos', maxCount: 10}
    ], STORAGE_MULTER_CONFIG_CARS)
  )
  async addNewCar(
    @Body() params,
    @Res({passthrough: true}) res
  ) {
    console.log(params);
    const car = await this.carsService.addNewCar({
      ownerId: res.locals.id,
      specs: params.specs,
      rentInfo: params.rentInfo,
      insurance: params.insurance,
      options: params.options,
      services: params.services
    });

    this.carFilesService.createCarFolder(String(car._id));

    return car;
  }

  @Get('/car/basic-info/:id')
  getBasicCarInfo(
    @Param() params
  ) {
    return `params is ${params}`
  }

  @Get("/car/get-basic-info/:id")
  async getBasicInfoById(
    @Param() params
  ) {
    const foundCar = await this.carsService.getCar(params.id);
    const { options, services, insurance, ...result} = foundCar;
    return result;
  }

  @Get("/car/get-full-info/:id")
  async getFullInfoById(
    @Param() params
  ) {
    const foundCar = await this.carsService.getCar(params.id);
    return foundCar;
  }

  @Get("car/get-images/:id")
  async getCarImages(
    @Param() params
  ) {
    return "Hey, Hey";
  }

  @Get('get-list')
  async getCarsList() {
    return await this.carsService.getCarList();
  }

  @Get('/random-12')
  async getRandom12Cars() {
    return await this.carsService.getCarRandom12List();
  }
}
