import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { Chapter } from '../chapters/entities/chapter.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  create(dto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(dto);
    return this.courseRepository.save(course);
  }

  findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found.`);
    }
    return course;
  }

  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);
    await this.courseRepository.remove(course);
  }

  async update(id: number, dto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    // 💡 Règle métier : ne pas publier si pas de description
  // if (dto.isPublished === true) {
  //   const descriptionToCheck = dto.description ?? course.description;

  //   if (!descriptionToCheck || descriptionToCheck.trim() === '') {
  //     throw new BadRequestException('A course cannot be published without a description.');
  //   }
  // }

    // Mise à jour partielle
    Object.assign(course, dto);
    return this.courseRepository.save(course);
  }

  async findPublished(): Promise<Course[]> {
    return this.courseRepository.find({
      where: { isPublished: true },
    });
  }

  async findChaptersByCourseId(courseId: number): Promise<Chapter[]> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['chapters'], // charger les chapters liés
    });

    if (!course) {
      throw new NotFoundException(`Course with id ${courseId} not found`);
    }

    return course.chapters;
  }
}
