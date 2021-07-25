import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class CarFilesService {

  createCarFolder(id: string) {
    const folderName = id.split("@")[0];
    const folderPath = `./files/carsF/${folderName}`;
    console.log(folderPath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    this.moveAllInUserFolder(folderPath);
    return folderPath;
  }

  private moveAllInUserFolder(folderPath: string) {
    const files = fs.readdirSync('./files/carsF').filter(file => file.includes('.'));
    console.log("Files - " + files);
    for (let file of files) {
      console.log(file);
      fs.renameSync(`./files/carsF/${file}`, `${folderPath}/${file}`);
    }
  }

  findCarImagesPath(id: string) {
    const folderPath = `./files/carsF/${id}`;
    console.log(folderPath);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath).filter(file => file.includes('.')).map((imagePath) => `/files/carsF/${id}/${imagePath}`);
      if (files.length) return files;
      throw new BadRequestException('Car does not have images');
    } else {
      throw new BadRequestException('This car does not exist');
    }
  }
}
