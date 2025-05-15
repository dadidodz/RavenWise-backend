import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto } from './dtos/create-chapter.dto';
// import { UpdateChapterDto } from './dtos/update-chapter.dto';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
    
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createDto: CreateChapterDto): Promise<Chapter> {
    const course = await this.courseRepository.findOne({ where: { id: createDto.courseId } });

    if (!course) throw new NotFoundException('Course not found');

    const chapter = this.chapterRepository.create({
      title: createDto.title,
      description: createDto.description,
      course,
    });

    return this.chapterRepository.save(chapter);
  }

  findAll(): Promise<Chapter[]> {
    return this.chapterRepository.find({ relations: ['course'] });
  }

  async findByCourseId(courseId: number) {
    return this.chapterRepository.find({
      where: { course: { id: courseId } },
      // relations: ['course'],
    });
  }

  async findOne(id: number): Promise<Chapter> {
    const chapter = await this.chapterRepository.findOne({ where: { id }, relations: ['course'] });
    if (!chapter) throw new NotFoundException('Chapter not found');
    return chapter;
  }

//   async update(id: number, updateDto: UpdateChapterDto): Promise<Chapter> {
//     const chapter = await this.chapterRepository.findOne({ where: { id } });
//     if (!chapter) throw new NotFoundException('Chapter not found');

//     Object.assign(chapter, updateDto);
//     return this.chapterRepository.save(chapter);
//   }

  async remove(id: number): Promise<void> {
    const chapter = await this.chapterRepository.findOne({ where: { id } });
    if (!chapter) throw new NotFoundException('Chapter not found');
    await this.chapterRepository.remove(chapter);
  }

  async countByCourseId(courseId: number): Promise<number> {
    return this.chapterRepository.count({
      where: { course: { id: courseId } },
    });
  }

}
