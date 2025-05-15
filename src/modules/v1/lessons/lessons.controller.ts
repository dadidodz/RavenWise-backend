import { Controller, Post, Body, Get, Query, ParseIntPipe, Param } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dtos/create-lesson.dto';

@Controller('api/v1/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  // GET

  // @Get()
  // findAll() {
  //   return this.lessonsService.findAll();
  // }
  @Get()
  findAll(@Query('chapterId', ParseIntPipe) chapterId: number) {
    if (chapterId) {
      return this.lessonsService.findByChapterId(chapterId);
    }
    return this.lessonsService.findAll();
  }

  @Get('chapter/:chapterId/total-duration')
  getTotalDurationByChapterId(@Param('chapterId', ParseIntPipe) chapterId: number) {
    return this.lessonsService.getTotalDurationByChapterId(chapterId);
  }

  // POST

  @Post()
  create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.create(dto);
  }

  
}
