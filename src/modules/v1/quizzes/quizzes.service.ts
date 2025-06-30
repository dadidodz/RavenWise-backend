import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { CreateQuizWithAnswersDto } from './dtos/create-quiz-with-answers.dto';
import { QuizAnswer } from '../quiz_answers/entities/quiz-answer.entity';
import { ValidateQuizAnswerDto } from './dtos/validate-quiz-answer.dto';
import { UpdateQuizWithAnswersDto } from './dtos/update-quiz-with-answers.dto';

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
        // ✅ 1. Vérifier qu'il y a exactement UNE réponse correcte
        const correctAnswers = dto.answers.filter(ans => ans.isCorrect);
        if (correctAnswers.length !== 1) {
            throw new BadRequestException('Il doit y avoir exactement UNE réponse correcte.');
        }

        // ✅ 2. Vérifier que la lesson existe
        const lesson = await this.lessonRepository.findOneBy({ id: dto.lessonId });
        if (!lesson) {
            throw new NotFoundException("Leçon introuvable.");
        }

        // ✅ 3. Vérifier que le type de la leçon est 'quiz'
        if (lesson.type !== 'quiz') {
            throw new BadRequestException(`Impossible d'associer un quiz à une leçon de type "${lesson.type}".`);
        }

        // ✅ 4. Créer et sauvegarder le quiz
        const quiz = this.quizRepository.create({ question: dto.question, lesson });
        await this.quizRepository.save(quiz);

        // ✅ 5. Créer et sauvegarder les réponses associées
        const answers = dto.answers.map(a =>
            this.quizAnswerRepository.create({
            ...a,
            quiz,
            }),
        );
        await this.quizAnswerRepository.save(answers);

        // ✅ 6. Renvoyer le quiz avec les réponses
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

    async update(id: number, dto: UpdateQuizWithAnswersDto): Promise<Quiz> {
        const quiz = await this.quizRepository.findOne({
            where: { id },
            relations: ['answers', 'lesson'], // charger les relations
        });

        if (!quiz) {
            throw new NotFoundException(`Quiz with id ${id} not found`);
        }

        // Vérification éventuelle du lessonId
        if (dto.lessonId) {
            const lesson = await this.lessonRepository.findOne({
            where: { id: dto.lessonId },
            });

            if (!lesson) {
            throw new NotFoundException('Lesson not found');
            }

            if (lesson.type !== 'quiz') {
            throw new BadRequestException('Lesson type must be "quiz"');
            }

            quiz.lesson = lesson;
        }

        // Mise à jour de la question si fournie
        if (dto.question) {
            quiz.question = dto.question;
        }

        // Mise à jour des réponses si fournies
        if (dto.answers) {
            const correctAnswersCount = dto.answers.filter(a => a.isCorrect).length;

            if (correctAnswersCount !== 1) {
                throw new BadRequestException('Exactly one answer must be marked as correct.');
            }

            // Supprimer les anciennes réponses
            await this.quizAnswerRepository.delete({ quiz: { id: quiz.id } });

            // Créer et sauvegarder les nouvelles réponses
            const newAnswers = dto.answers.map(answer =>
                this.quizAnswerRepository.create({
                ...answer,
                quiz,
                }),
            );

            await this.quizAnswerRepository.save(newAnswers);
            quiz.answers = newAnswers;
        }

        // Sauvegarde finale du quiz avec ses modifications
        return this.quizRepository.save(quiz);
    }

    async findQuizByLessonId(lessonId: number): Promise<Quiz> {
        // Vérifie d'abord si la leçon existe
        const lesson = await this.lessonRepository.findOne({ where: { id: lessonId } });

        if (!lesson) {
            throw new NotFoundException(`Leçon avec l'id ${lessonId} non trouvée`);
        }

        if (lesson.type !== 'quiz') {
            throw new BadRequestException(`La leçon avec l'id ${lessonId} n'est pas de type "quiz"`);
        }

        // Récupère le quiz avec ses réponses
        const quiz = await this.quizRepository.findOne({
            where: { lesson: { id: lessonId } },
            relations: ['answers'],
        });

        if (!quiz) {
            throw new NotFoundException(`Aucun quiz trouvé pour la leçon ${lessonId}`);
        }

        return quiz;
    }

    async getRandomQuizByCourseId(courseId: number): Promise<Quiz | null> {
        const quizzes = await this.quizRepository
            .createQueryBuilder('quiz')
            .innerJoinAndSelect('quiz.lesson', 'lesson')
            .innerJoin('lesson.chapter', 'chapter')
            .innerJoin('chapter.course', 'course')
            .leftJoinAndSelect('quiz.answers', 'answers')
            .where('course.id = :courseId', { courseId })
            .getMany();

        if (quizzes.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * quizzes.length);
        return quizzes[randomIndex];
    }

    async findAllByCourseId(courseId: number): Promise<Quiz[]> {
        return this.quizRepository
            .createQueryBuilder('quiz')
            .leftJoinAndSelect('quiz.lesson', 'lesson')
            .leftJoinAndSelect('lesson.chapter', 'chapter')
            .leftJoinAndSelect('chapter.course', 'course')
            .leftJoinAndSelect('quiz.answers', 'answers') // ✅ AJOUT ICI
            .where('course.id = :courseId', { courseId })
            .getMany();
    }


}
