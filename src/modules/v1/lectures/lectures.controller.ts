import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dtos/create-lecture.dto';
import { Lecture } from './entities/lecture.entity';
import { UpdateLectureDto } from './dtos/update-lecture.dto';

@Controller('api/v1/lectures')
export class LecturesController {
    constructor(private readonly lecturesService: LecturesService) {}

    @Post()
    async create(@Body() createLectureDto: CreateLectureDto) {
        return this.lecturesService.create(createLectureDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Lecture | null> {
        return this.lecturesService.findOne(+id);
    }

    @Get('by-lesson/:lessonId')
    async getByLessonId(@Param('lessonId', ParseIntPipe) lessonId: number) {
        return this.lecturesService.findOneByLessonId(lessonId);
    }


    @Patch(':id')
    updateLecture(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateLectureDto,
    ) {
        return this.lecturesService.update(id, updateDto);
    }
}
