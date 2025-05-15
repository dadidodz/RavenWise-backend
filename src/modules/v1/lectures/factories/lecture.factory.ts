import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { CreateLectureDto } from '../../lectures/dtos/create-lecture.dto';

export async function createFakeLecture(lessonRepository: Repository<Lesson>): Promise<CreateLectureDto> {
    const lesson = await lessonRepository.find();

    if (lesson.length === 0) {
        throw new Error('Aucune leçon trouvée pour associer un exercice.');
      }
      
    const randomLesson = lesson[Math.floor(Math.random() * lesson.length)];

    return {
        content: faker.lorem.sentence(),
        lessonId: randomLesson.id
    };
}