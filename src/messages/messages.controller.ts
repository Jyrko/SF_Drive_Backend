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
import { ObjectID } from "mongodb";

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  public async messages(
    @Req() req: any,
    @Res({passthrough: true}) res: any,
    @Query('selectedUser') selectedUser: string,
  ) {
    const id = res.locals.id;

    return await this.messagesService.findAll({
      where: {
        user: {
          _id: new ObjectID(id)
        }
      }
    });
    // return await this.messagesService.findAll({
    //   where: {
    //     $or: [{
    //         user: {
    //           _id: new ObjectID(id)
    //         },
    //         toUser: selectedUser,
    //       },
    //       {
    //         user: selectedUser,
    //         toUser: {
    //           _id: new ObjectID(id)
    //         }
    //       },
    //     ]
    //   },
    //   order: {
    //     createdAt: 'DESC',
    //   },
    // });
  }

  @Post()
  public async create(
    @Res({passthrough: true}) res: any,
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    const userId = res.locals.id;

    return await this.messagesService.create(userId, createMessageDto);
  }
}
