import { Injectable } from "@nestjs/common";
import { getMongoRepository, Repository, ObjectID } from "typeorm";
import { Car } from "../entities/car.entity";


@Injectable()
export class CarsRepository {

  async addCar(car: Car) {
    const repository = getMongoRepository(Car);
    return await repository.save(car);
  }

  async getCar(id: string) {
    const repository = getMongoRepository(Car);
    console.log("ID in repo is " + id)
    return await repository.findOne({ _id: new ObjectID(id) })
  }

  async getCarList() {
    const repository = getMongoRepository(Car);
    return await repository.find();
  }

  async getCarsByUserId(id: string) {
    const repository = getMongoRepository(Car);
    console.log(id);
    return await repository.find({
        where: {
          ['ownerId']: id
        }
     });
  }

  async addReservedCarDays(carId: string, days: string) {
    const repository = getMongoRepository(Car);
    const car = await repository.findOne({ _id: new ObjectID(carId) });
    car.availability.push(days);
    return await repository.save(car);
  }
}
