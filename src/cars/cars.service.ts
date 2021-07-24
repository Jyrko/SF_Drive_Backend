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

    newCar.specs = JSON.parse(car.specs);
    newCar.rentInfo = JSON.parse(car.rentInfo);
    newCar.insurance = JSON.parse(car.insurance);
    newCar.options = JSON.parse(car.options);
    newCar.services = JSON.parse(car.services);

    return await this.carsRepository.addCar(newCar);
  }

  async getCar(id: string) {
    return await this.carsRepository.getCar(id);
  }

  async getCarList() {
    return await this.carsRepository.getCarList();
  }

  async getCarRandom12List() {
    const random12Array = await this.carsRepository.getCarList();
    return this.cleanUpFromUnnecessaryDataArray(random12Array.slice(0, 11));
  }

  private cleanUpFromUnnecessaryData(car) {
    const {options, services, insurance, ...result} = car;
    return result;
  }

  private cleanUpFromUnnecessaryDataArray(carList) {
    const newCarListArray = [];
    for (let car of carList) {
      newCarListArray.push(this.cleanUpFromUnnecessaryData(car));
    }
    return newCarListArray;
  }
}
