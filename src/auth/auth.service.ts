import { Injectable } from '@nestjs/common';
import {getMongoManager} from 'typeorm';
import { User } from "./entities/user.entity"

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello World!';
  }

  async createUser(user: any) {
    const manager = getMongoManager();
    const newUser = new User();

    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.birthdate = user.birthday;
    newUser.passport = JSON.parse(user.passport);
    newUser.license = JSON.parse(user.license);
    console.log(newUser);

    return await manager.save(newUser);
  }

  async findOne(condition: any) {
    const manager = getMongoManager();
    return manager.findOne(User, condition)
  }
}
