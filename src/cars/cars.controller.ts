import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getHello() {
    return "Hello World!"
  }

  @Post('/add-car')
  addNewCar(
    @Body() params,
    @Res({passthrough: true}) res
  ) {

    const car = this.carsService.addNewCar({
      ownerId: res.locals.id,
      specs: params.specs,
      rentInfo: params.rentInfo,
      insurance: params.insurance
    });

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
