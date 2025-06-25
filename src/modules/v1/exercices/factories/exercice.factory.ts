import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { CreateExerciceDto } from '../dtos/create-exercice.dto';

export async function createFakeExercice(lessonRepository: Repository<Lesson>): Promise<CreateExerciceDto> {
    const lesson = await lessonRepository.find();

    if (lesson.length === 0) {
        throw new Error('Aucune leçon trouvée pour associer un exercice.');
      }
      
    const randomLesson = lesson[Math.floor(Math.random() * lesson.length)];

    return {
        startingCode: faker.lorem.sentences(),
        solution: faker.lorem.sentences(),
        content: faker.lorem.sentence(),
        deposit: faker.lorem.sentence(),
        lessonId: randomLesson.id
    };
}