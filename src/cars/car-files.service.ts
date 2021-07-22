import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class CarFilesService {

  createCarFolder(id: string) {
    const folderName = id.split("@")[0];
    const folderPath = `./files/cars/${folderName}`;
    console.log(folderPath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    this.moveAllInUserFolder(folderPath);
    return folderPath;
  }

  private moveAllInUserFolder(folderPath: string) {
    const files = fs.readdirSync('./files/cars').filter(file => file.includes('.'));
    console.log("Files - " + files);
    for (let file of files) {
      console.log(file);
      fs.renameSync(`./files/cars/${file}`, `${folderPath}/${file}`);
    }
  }
}
