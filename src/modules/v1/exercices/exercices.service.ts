import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercice } from './entities/exercice.entity';
import { CreateExerciceDto } from './dtos/create-exercice.dto';
import { Lesson } from '../lessons/entities/lesson.entity';
import { UpdateExerciceDto } from './dtos/update-exercice.dto';

@Injectable()
export class ExercicesService {
    constructor(
        @InjectRepository(Exercice) private readonly exerciceRepository: Repository<Exercice>,
        @InjectRepository(Lesson) private readonly lessonRepository: Repository<Lesson>,
    ) {}

    async create(createExerciceDto: CreateExerciceDto): Promise<Exercice> {
        const lesson = await this.lessonRepository.findOne({
            where: { id: createExerciceDto.lessonId },
        });

        if (!lesson) {
            //   throw new Error('Leçon non trouvée');
            throw new HttpException('Invalid lesson ID', HttpStatus.BAD_REQUEST);
        }

        if (lesson.type !== 'exercice') {
            throw new HttpException('This lesson is not of type "exercice"', HttpStatus.BAD_REQUEST);
        }

        const exercice = this.exerciceRepository.create({
            ...createExerciceDto,
            lesson,
        });

        return this.exerciceRepository.save(exercice);
    }

    async findOne(id: number): Promise<Exercice | null> {
        return this.exerciceRepository.findOneBy({ id });
    }

    async update(id: number, dto: UpdateExerciceDto): Promise<Exercice> {
        const exercice = await this.exerciceRepository.findOne({ where: { id } });
        if (!exercice) {
            throw new NotFoundException(`Exercice with id ${id} not found`);
        }

        if (dto.lessonId) {
            const lesson = await this.lessonRepository.findOne({ where: { id: dto.lessonId } });
            if (!lesson) {
            throw new NotFoundException('Course not found');
            }

            if (lesson.type !== 'exercice') {
            throw new HttpException('This lesson is not of type "exercice"', HttpStatus.BAD_REQUEST);
            }
            exercice.lesson = lesson;
        }

        Object.assign(exercice, dto);
        return this.exerciceRepository.save(exercice);
    }

    async findOneByLessonId(lessonId: number): Promise<Exercice> {
        const lesson = await this.lessonRepository.findOne({
            where: { id: lessonId },
        });

        if (!lesson) {
            throw new NotFoundException(`Leçon avec l'id ${lessonId} non trouvée`);
        }

        if (lesson.type !== 'exercice') {
            throw new BadRequestException(`La leçon avec l'id ${lessonId} n'est pas de type 'exercise'`);
        }

        const exercice = await this.exerciceRepository.findOne({
            where: { lesson: { id: lessonId } },
            relations: ['lesson'],
        });

        if (!exercice) {
            throw new NotFoundException(`Aucun exercice trouvé pour la leçon ${lessonId}`);
        }

        return exercice;
    }


}
