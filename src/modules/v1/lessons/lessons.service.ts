import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { Chapter } from '../chapters/entities/chapter.entity';
import { UpdateLessonDto } from './dtos/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private lessonsRepo: Repository<Lesson>,
    @InjectRepository(Chapter) private chaptersRepo: Repository<Chapter>
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const chapter = await this.chaptersRepo.findOne({ where: { id: createLessonDto.chapterId } });
    if (!chapter) throw new HttpException('Invalid chapter ID', HttpStatus.BAD_REQUEST);

    const lesson = this.lessonsRepo.create({
      ...createLessonDto,
      chapter,
    });
    return this.lessonsRepo.save(lesson);
  }

  findAll(): Promise<Lesson[]> {
    return this.lessonsRepo.find({ relations: ['chapter'] });
  }

  async findOne(id: number): Promise<Lesson | null> {
      return this.lessonsRepo.findOneBy({ id });
  }

  async findByChapterId(chapterId: number) {
    return this.lessonsRepo.find({
      where: { chapter: { id: chapterId } },
      // relations: ['course'],
    });
  }

  async getTotalDurationByChapterId(chapterId: number): Promise<number> {
    const chapter = await this.chaptersRepo.findOne({ where: { id: chapterId } });

    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${chapterId} not found`);
    }
    const result = await this.lessonsRepo
      .createQueryBuilder('lesson')
      .select('SUM(lesson.estimated_duration)', 'total')
      .where('lesson.chapterId = :chapterId', { chapterId })
      .getRawOne();

    return result.total ? Number(result.total) : 0;
  }

  async update(id: number, dto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonsRepo.findOne({ where: { id } });
    if (!lesson) {
      throw new NotFoundException(`Chapter with id ${id} not found`);
    }

    if (dto.chapterId) {
      const chapter = await this.chaptersRepo.findOne({ where: { id: dto.chapterId } });
      if (!chapter) {
        throw new NotFoundException('Course not found');
      }
      lesson.chapter = chapter;
    }

    Object.assign(lesson, dto); // copie les autres champs (titre, etc.)
    return this.lessonsRepo.save(lesson);
  }

  async remove(id: number): Promise<void> {
    const lesson = await this.lessonsRepo.findOne({ where: { id } });
    if (!lesson) throw new NotFoundException('Chapter not found');
    await this.lessonsRepo.remove(lesson);
  }

}
