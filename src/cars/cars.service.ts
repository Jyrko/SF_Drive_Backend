import { Injectable } from '@nestjs/common';
import { CarFilesService } from './car-files.service';
import { Car } from './entities/car.entity';
import { CarsRepository } from './repositories/cars.repository';

@Injectable()
export class CarsService {
  constructor(
    private carsRepository: CarsRepository,
    private readonly carFilesService: CarFilesService
  ) {}

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
    return this.cleanUpFromUnnecessaryDataAddImagePathesArray(await this.carsRepository.getCarList());
  }

  async getCarRandom12List() {
    const random12Array = await this.carsRepository.getCarList();
    return this.cleanUpFromUnnecessaryDataAddImagePathesArray(random12Array.slice(0, 12));
  }

  private cleanUpFromUnnecessaryAddImagePathesData(car) {
    const imagePathes = this.carFilesService.findCarImagesPath(car._id);
    const {insurance, ...result} = car;
    return {
      ...result,
      images: imagePathes
    };
  }

  private cleanUpFromUnnecessaryDataAddImagePathesArray(carList) {
    const newCarListArray = [];
    for (let car of carList) {
      newCarListArray.push(this.cleanUpFromUnnecessaryAddImagePathesData(car));
    }
    return newCarListArray;
  }

  async getUserCarsById(id: string) {
    return this.cleanUpFromUnnecessaryDataAddImagePathesArray(await this.carsRepository.getCarsByUserId(id));
  }
}
