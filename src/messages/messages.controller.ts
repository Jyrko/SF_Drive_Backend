import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { User } from '../auth/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './entity/message.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  public async messages(
    @Req() req: any,
    @Query('selectedUser') selectedUser: string,
  ) {
    const user = req.user as User;

    return this.messagesService.findAll({
      where: [
        {
          user: user._id,
          toUser: selectedUser,
        },
        {
          user: selectedUser,
          toUser: user._id,
        },
      ],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  @Post()
  public async create(
    @Req() req: any,
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    const user = req.user as User;

    return await this.messagesService.create(user, createMessageDto);
  }
}
