import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
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
    @Res() res: any,
    @Query('selectedUser') selectedUser: string,
  ) {
    const id = res.locals.id;

    return this.messagesService.findAll({
      where: [
        {
          user: id,
          toUser: selectedUser,
        },
        {
          user: selectedUser,
          toUser: id,
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
