import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dtos/create-lecture.dto';
import { Lecture } from './entities/lecture.entity';

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
}
