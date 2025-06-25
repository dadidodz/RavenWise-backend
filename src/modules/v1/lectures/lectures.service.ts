import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from './entities/lecture.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { CreateLectureDto } from './dtos/create-lecture.dto';
import { UpdateLectureDto } from './dtos/update-lecture.dto';

@Injectable()
export class LecturesService {
    constructor(
        @InjectRepository(Lecture) private readonly lectureRepository: Repository<Lecture>,
        @InjectRepository(Lesson) private readonly lessonRepository: Repository<Lesson>,
    ) {}

    // async create(createLectureDto: CreateLectureDto): Promise<Lecture> {
    //     const lesson = await this.lessonRepository.findOne({
    //         where: { id: createLectureDto.lessonId },
    //     });

    //     if (!lesson) {
    //         //   throw new Error('Leçon non trouvée');
    //         throw new HttpException('Invalid lesson ID', HttpStatus.BAD_REQUEST);
    //     }

    //     const lecture = this.lectureRepository.create({
    //         ...createLectureDto,
    //         lesson,
    //     });

    //     return this.lectureRepository.save(lecture);
    // }

    async create(createLectureDto: CreateLectureDto): Promise<Lecture> {
        const lesson = await this.lessonRepository.findOne({
            where: { id: createLectureDto.lessonId },
        });

        if (!lesson) {
            throw new HttpException('Invalid lesson ID', HttpStatus.BAD_REQUEST);
        }

        if (lesson.type !== 'lecture') {
            throw new HttpException('This lesson is not of type "lecture"', HttpStatus.BAD_REQUEST);
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

    async update(id: number, dto: UpdateLectureDto): Promise<Lecture> {
        const lecture = await this.lectureRepository.findOne({ where: { id } });
        if (!lecture) {
          throw new NotFoundException(`Lecture with id ${id} not found`);
        }
    
        if (dto.lessonId) {
            const lesson = await this.lessonRepository.findOne({ where: { id: dto.lessonId } });
            if (!lesson) {
                throw new NotFoundException('Lesson not found');
            }

            if (lesson.type !== 'lecture') {
                throw new HttpException('This lesson is not of type "lecture"', HttpStatus.BAD_REQUEST);
            }
            lecture.lesson = lesson;
        }
    
        Object.assign(lecture, dto);
        return this.lectureRepository.save(lecture);
    }

}
