import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AuthFilesService {

  createUserFolder(email: string) {
    const folderName = email.split("@")[0];
    const folderPath = `./files/${folderName}`;
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
}
