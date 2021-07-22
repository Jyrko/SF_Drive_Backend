import { Injectable } from '@nestjs/common';
import { Car } from './entities/car.entity';
import { CarsRepository } from './repositories/cars.repository';

@Injectable()
export class CarsService {
  constructor(private carsRepository: CarsRepository) {}

  async addNewCar(car: any) {
    const newCar = new Car();

    console.log(car.specs.model);
    newCar.ownerId = car.ownerId;

    newCar.specs = car.specs;
    newCar.rentInfo = car.rentInfo;
    newCar.insurance = car.insurance;
    newCar.options = car.options;
    newCar.services = car.services;

    return await this.carsRepository.addCar(newCar);
  }

  async getCar(id: string) {
    return await this.carsRepository.getCar(id);
  }
}
