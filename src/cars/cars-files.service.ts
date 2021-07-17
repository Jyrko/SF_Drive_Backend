import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AuthFilesService {

  createCarFolder(id: string) {
    const folderName = id;
    const folderPath = `./files/cars/${folderName}`;
    console.log(folderPath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    this.moveAllInCarFolder(folderPath);
    return folderPath;
  }

  private moveAllInCarFolder(folderPath: string) {
    const files = fs.readdirSync('./files').filter(file => file.includes('.'));
    console.log("Files - " + files);
    for (let file of files) {
      console.log(file);
      fs.renameSync(`./files/${file}`, `${folderPath}/${file}`);
    }
  }
}
