import { Controller, Get, Post, Body, Param, Delete, Put, Query, ParseIntPipe, Patch } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dtos/create-chapter.dto';
import { UpdateChapterDto } from './dtos/update-chapter.dto';
// import { UpdateChapterDto } from './dtos/update-chapter.dto';

@Controller('api/v1/chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  // GET
  // @Get()
  // findAll() {
  //   return this.chaptersService.findAll();
  // }

  @Get()
  findAll(@Query('courseId') courseId?: number) {
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
  async countByCourseId(@Param('courseId', ParseIntPipe) courseId: number) {
    const count = await this.chaptersService.countByCourseId(courseId);
    return ({ count });
  }

  // POST
  @Post()
  create(@Body() dto: CreateChapterDto) {
    return this.chaptersService.create(dto);
  }

  @Patch(':id')
  updateChapter(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateChapterDto,
  ) {
    return this.chaptersService.update(id, updateDto);
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
