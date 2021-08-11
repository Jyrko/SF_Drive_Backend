import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './entity/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly usersService: AuthService,
  ) {}

  findAll(options?: FindManyOptions<MessageEntity>) {
    return this.messageRepository.find({
      relations: ['user', 'toUser'],
      ...options,
    });
  }

  async create(
    user: User,
    createMessageDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    const toUser = await this.usersService.findOne({
      where: { id: createMessageDto.toUserId },
    });

    if (!toUser) {
      throw new HttpException(
        `User ${createMessageDto.toUserId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      const message: MessageEntity = this.messageRepository.create({
        user,
        toUser,
        body: createMessageDto.body,
      });
      return await this.messageRepository.save(message);
    } catch (error) {
      switch (error.code) {
        case 'SQLITE_CONSTRAINT':
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        default:
          throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
      }
    }
  }
}
