import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dtos/create-quiz.dto';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
        @InjectRepository(Lesson) private readonly lessonRepository: Repository<Lesson>,
    ) {}

    async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
        const lesson = await this.lessonRepository.findOne({
            where: { id: createQuizDto.lessonId },
        });

        if (!lesson) {
            //   throw new Error('Leçon non trouvée');
            throw new HttpException('Invalid lesson ID', HttpStatus.BAD_REQUEST);
        }

        const quiz = this.quizRepository.create({
            ...createQuizDto,
            lesson,
        });

        return this.quizRepository.save(quiz);
    }

}
