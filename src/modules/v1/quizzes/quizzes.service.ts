import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { CreateQuizWithAnswersDto } from './dtos/create-quiz-with-answers.dto';
import { QuizAnswer } from '../quiz_answers/entities/quiz-answer.entity';
import { ValidateQuizAnswerDto } from './dtos/validate-quiz-answer.dto';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
        @InjectRepository(Lesson) private readonly lessonRepository: Repository<Lesson>,
        @InjectRepository(QuizAnswer) private readonly quizAnswerRepository: Repository<QuizAnswer>,
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

    async findOneWithAnswers(id: number): Promise<Quiz> {
        const quiz = await this.quizRepository.findOne({
            where: { id },
            relations: ['answers'],
        });

        if (!quiz) {
            throw new NotFoundException(`Quiz avec l'id ${id} non trouvé`);
        }

        return quiz;
    }

    // async createWithAnswers(dto: CreateQuizWithAnswersDto): Promise<Quiz> {
    //     const correctAnswers = dto.answers.filter(ans => ans.isCorrect);

    //     if (correctAnswers.length !== 1) {
    //         throw new BadRequestException('Il doit y avoir exactement UNE réponse correcte.');
    //     }

    //     // const quiz = this.quizRepository.create({ question: dto.question });
    //     const lesson = await this.lessonRepository.findOneBy({ id: dto.lessonId });
    //     if (!lesson) throw new NotFoundException("...");
    //     const quiz = this.quizRepository.create({ question: dto.question, lesson });
    //     await this.quizRepository.save(quiz);

    //     const answers = dto.answers.map(a =>
    //         this.quizAnswerRepository.create({
    //         ...a,
    //         quiz,
    //         }),
    //     );
    //     await this.quizAnswerRepository.save(answers);

    //     const quizWithAnswers = await this.quizRepository.findOne({
    //         where: { id: quiz.id },
    //         relations: ['answers'],
    //     });

    //     if (!quizWithAnswers) {
    //         throw new NotFoundException(`Quiz avec id ${quiz.id} introuvable après création.`);
    //     }

    //     return quizWithAnswers;
    // }

    async createWithAnswers(dto: CreateQuizWithAnswersDto): Promise<Quiz> {
        const correctAnswers = dto.answers.filter(ans => ans.isCorrect);
        if (correctAnswers.length !== 1) {
            throw new BadRequestException('Il doit y avoir exactement UNE réponse correcte.');
        }

        const lesson = await this.lessonRepository.findOneBy({ id: dto.lessonId });
        if (!lesson) throw new NotFoundException("Leçon introuvable.");

        // ✅ Vérification que le type de leçon est 'quiz'
        if (lesson.type !== 'quiz') {
            throw new BadRequestException(`Impossible d'associer un quiz à une leçon de type "${lesson.type}".`);
        }

        const quiz = this.quizRepository.create({ question: dto.question, lesson });
        await this.quizRepository.save(quiz);

        const answers = dto.answers.map(a =>
            this.quizAnswerRepository.create({
            ...a,
            quiz,
            }),
        );
        await this.quizAnswerRepository.save(answers);

        const quizWithAnswers = await this.quizRepository.findOne({
            where: { id: quiz.id },
            relations: ['answers'],
        });

        if (!quizWithAnswers) {
            throw new NotFoundException(`Quiz avec id ${quiz.id} introuvable après création.`);
        }

        return quizWithAnswers;
    }


    async validateAnswer(quizId: number, dto: ValidateQuizAnswerDto): Promise<{ correct: boolean }> {
        const quiz = await this.quizRepository.findOne({
            where: { id: quizId },
            relations: ['answers'],
        });

        if (!quiz) {
            throw new NotFoundException(`Quiz avec l'id ${quizId} introuvable.`);
        }

        const selectedAnswer = quiz.answers.find(a => a.id === dto.answerId);

        if (!selectedAnswer) {
            throw new NotFoundException(`Réponse avec l'id ${dto.answerId} non liée à ce quiz.`);
        }

        return { correct: selectedAnswer.isCorrect };
    }

}
