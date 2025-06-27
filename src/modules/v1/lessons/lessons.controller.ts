import { Controller, Post, Body, Get, Query, ParseIntPipe, Param, Patch, Delete } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { UpdateLessonDto } from './dtos/update-lesson.dto';

@Controller('api/v1/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  // GET

  // @Get()
  // findAll() {
  //   return this.lessonsService.findAll();
  // }
  @Get()
  findAll(@Query('chapterId') chapterId?: number) {
    if (chapterId) {
      return this.lessonsService.findByChapterId(chapterId);
    }
    return this.lessonsService.findAll();
  }

  @Get('chapter/:chapterId/total-duration')
  getTotalDurationByChapterId(@Param('chapterId', ParseIntPipe) chapterId: number) {
    return this.lessonsService.getTotalDurationByChapterId(chapterId);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Lesson | null> {
      return this.lessonsService.findOne(+id);
  }

  // POST

  @Post()
  create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.create(dto);
  }

  @Patch(':id')
  updateLesson(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.lessonsService.remove(id);
  }

  
}
