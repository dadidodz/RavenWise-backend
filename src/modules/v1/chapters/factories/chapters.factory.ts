import { faker } from '@faker-js/faker';
import { CreateChapterDto } from '../dtos/create-chapter.dto';
import { Repository } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

export async function createFakeChapter(courseRepository: Repository<Course>): Promise<CreateChapterDto> {
    const courses = await courseRepository.find();

    if (courses.length === 0) {
        throw new Error('Aucun cours trouvé pour associer un chapitre.');
      }

    const randomCourse = courses[Math.floor(Math.random() * courses.length)];

    return {
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        courseId: randomCourse.id,
    };
}