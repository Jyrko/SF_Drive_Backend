import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { FindManyOptions, getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './entity/message.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    private readonly usersService: AuthService,
  ) {}


  async findAll(options?: any) {
    const messageRepository = getMongoRepository(MessageEntity);
    console.log(options);
    return await messageRepository.find({
      ...options
    });
  }

  async create(
    userId: string,
    createMessageDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    const messageRepository = getMongoRepository(MessageEntity);

    const toUser = await this.usersService.findOne({ _id: new ObjectID(createMessageDto.toUserId) }) as User;

    const user = await this.usersService.findOne({ _id: new ObjectID(userId)}) as User;

    if (!toUser) {
      throw new HttpException(
        `User ${createMessageDto.toUserId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    console.log(typeof user);
    console.log(typeof toUser);

    try {
      const message: MessageEntity = messageRepository.create({
        user: user,
        toUser: toUser,
        body: createMessageDto.body,
      });
      return await messageRepository.save(message);
    } catch (error) {
      switch (error.code) {
        case 'SQLITE_CONSTRAINT':
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        default:
          throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
      }
    }
  }

  cleanupUser() {

  }
}
