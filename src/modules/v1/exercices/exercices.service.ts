import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercice } from './entities/exercice.entity';
import { CreateExerciceDto } from './dtos/create-exercice.dto';
import { Lesson } from '../lessons/entities/lesson.entity';

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

    const exercice = this.exerciceRepository.create({
      ...createExerciceDto,
      lesson,
    });

    return this.exerciceRepository.save(exercice);
  }
}
