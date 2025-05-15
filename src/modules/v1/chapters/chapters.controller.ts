import { Controller, Get, Post, Body, Param, Delete, Put, Query, ParseIntPipe } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dtos/create-chapter.dto';
// import { UpdateChapterDto } from './dtos/update-chapter.dto';

@Controller('api/v1/chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  create(@Body() dto: CreateChapterDto) {
    return this.chaptersService.create(dto);
  }

  // @Get()
  // findAll() {
  //   return this.chaptersService.findAll();
  // }

  @Get()
  findAll(@Query('courseId', ParseIntPipe) courseId: number) {
    if (courseId) {
      return this.chaptersService.findByCourseId(courseId);
    }
    return this.chaptersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.chaptersService.findOne(id);
  }

  @Get('course/:courseId/count')
  countByCourseId(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.chaptersService.countByCourseId(courseId).then(count => ({ count }));
  }

//   @Put(':id')
//   update(@Param('id') id: number, @Body() dto: UpdateChapterDto) {
//     return this.chaptersService.update(id, dto);
//   }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.chaptersService.remove(id);
  }
}
