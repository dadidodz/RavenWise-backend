import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizAnswer } from './entities/quiz-answer.entity';
import { Repository } from 'typeorm';
import { Quiz } from '../quizzes/entities/quiz.entity';
import { CreateQuizAnswerDto } from './dtos/create-quiz-answer.dto';

@Injectable()
export class QuizAnswersService {
    constructor(
        @InjectRepository(QuizAnswer)
        private readonly quizAnswerRepository: Repository<QuizAnswer>,

        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
    ) {}

    // async create(dto: CreateQuizAnswerDto): Promise<QuizAnswer> {
    //     const quiz = await this.quizRepository.findOneOrFail({ where: { id: dto.quizId } });
    //     const answer = this.quizAnswerRepository.create({ answer: dto.answer, isCorrect: dto.isCorrect, quiz });
    //     return this.quizAnswerRepository.save(answer);
    // }

    // async findAll(): Promise<QuizAnswer[]> {
    //     return this.quizAnswerRepository.find({ relations: ['quiz'] });
    // }

    // async remove(id: number): Promise<void> {
    //     await this.quizAnswerRepository.delete(id);
    // }

}

