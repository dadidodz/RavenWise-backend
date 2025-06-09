import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { QuizAnswersService } from './quiz_answers.service';
import { CreateQuizAnswerDto } from './dtos/create-quiz-answer.dto';

@Controller('api/v1/quiz-answers')
export class QuizAnswersController {
    constructor(private readonly service: QuizAnswersService) {}

    // @Post()
    // create(@Body() dto: CreateQuizAnswerDto) {
    //     return this.service.create(dto);
    // }

    // @Get()
    // findAll() {
    //     return this.service.findAll();
    // }

    // @Delete(':id')
    // remove(@Param('id', ParseIntPipe) id: number) {
    //     return this.service.remove(id);
    // }
}

