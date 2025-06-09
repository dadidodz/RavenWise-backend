import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from './entities/lecture.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { CreateLectureDto } from './dtos/create-lecture.dto';

@Injectable()
export class LecturesService {
    constructor(
        @InjectRepository(Lecture) private readonly lectureRepository: Repository<Lecture>,
        @InjectRepository(Lesson) private readonly lessonRepository: Repository<Lesson>,
    ) {}

    async create(createLectureDto: CreateLectureDto): Promise<Lecture> {
        const lesson = await this.lessonRepository.findOne({
            where: { id: createLectureDto.lessonId },
        });

        if (!lesson) {
            //   throw new Error('Leçon non trouvée');
            throw new HttpException('Invalid lesson ID', HttpStatus.BAD_REQUEST);
        }

        const lecture = this.lectureRepository.create({
            ...createLectureDto,
            lesson,
        });

        return this.lectureRepository.save(lecture);
    }

    async findOne(id: number): Promise<Lecture | null> {
        return this.lectureRepository.findOneBy({ id });
    }

}
