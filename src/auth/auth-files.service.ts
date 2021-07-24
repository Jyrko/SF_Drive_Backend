import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AuthFilesService {

  createUserFolder(id: string) {
    const folderName = id.split("@")[0];
    const folderPath = `./files/users/${folderName}`;
    console.log(folderPath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    this.moveAllInUserFolder(folderPath);
    return folderPath;
  }

  private moveAllInUserFolder(folderPath: string) {
    const files = fs.readdirSync('./files').filter(file => file.includes('.'));
    console.log("Files - " + files);
    for (let file of files) {
      console.log(file);
      fs.renameSync(`./files/${file}`, `${folderPath}/${file}`);
    }
  }

  findUserImage(id: string) {
    const folderPath = `./files/users/${id}`;
    console.log(folderPath);
    if (fs.existsSync(folderPath)) {
      
    } else {
      return "This user does not exist";
    }
  }
}
