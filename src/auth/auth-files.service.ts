import { BadRequestException, Injectable } from '@nestjs/common';
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

  findUserImagePath(id: string) {
    const folderPath = `./files/users/${id}`;
    console.log(folderPath);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath).filter(file => file.includes('.'));
      if (files.length) return files[0];
      throw new BadRequestException('User does not have profile image');
    } else {
      throw new BadRequestException('This user does not exist');
    }
  }
}
