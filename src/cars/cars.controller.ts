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
      {name: 'documentPhotos', maxCount: 5},
    ], STORAGE_MULTER_CONFIG_CARS)
  )
  async addNewCar(
    @Body() params,
    @Res({passthrough: true}) res
  ) {

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

  @Get("/car/:id")
  getCarById(
    @Param() params
  ) {
    const foundCar = this.carsService.getCar(params.id);
    return foundCar;
  }

  @Get('all-cars')
  getCarsList() {

  }

  @Get('/random-12')
  getRandom12Cars() {

  }
}
function id(id: any, arg1: string) {
  throw new Error('Function not implemented.');
}
