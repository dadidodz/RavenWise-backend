import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizWithAnswersDto } from './dtos/create-quiz-with-answers.dto';
import { ValidateQuizAnswerDto } from './dtos/validate-quiz-answer.dto';
import { UpdateQuizWithAnswersDto } from './dtos/update-quiz-with-answers.dto';
import { Quiz } from './entities/quiz.entity';

@Controller('api/v1/quizzes')
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) {}

    @Get(':id/with-answers')
    getWithAnswers(@Param('id', ParseIntPipe) id: number) {
        return this.quizzesService.findOneWithAnswers(id);
    }

    @Post('with-answers')
    createWithAnswers(@Body() dto: CreateQuizWithAnswersDto) {
        return this.quizzesService.createWithAnswers(dto);
    }

    @Post(':id/validate')
    async validateQuizAnswer(
        @Param('id', ParseIntPipe) quizId: number,
        @Body() dto: ValidateQuizAnswerDto,
    ) {
        return this.quizzesService.validateAnswer(quizId, dto);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateQuizWithAnswersDto,
    ): Promise<Quiz> {
        return this.quizzesService.update(id, dto);
    }

}
