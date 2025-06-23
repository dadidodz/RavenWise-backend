import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('api/v1/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // GET: tous les messages
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  // GET: un message par son ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.findOne(id);
  }

  // GET: tous les messages d'une publication
  @Get('/publication/:publicationId')
  findByPublicationId(@Param('publicationId', ParseIntPipe) publicationId: number) {
    return this.messagesService.findByPublicationId(publicationId);
  }

  @Get('user/:authorClerkId')
async getMessagesByUser(@Param('authorClerkId') authorClerkId: string) {
  return this.messagesService.findByUser(authorClerkId);
}


  // POST: création d’un nouveau message
  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.messagesService.create(dto);
  }

  // DELETE: suppression d’un message
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.remove(id);
  }
}
