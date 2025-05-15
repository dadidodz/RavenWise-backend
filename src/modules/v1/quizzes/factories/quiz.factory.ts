import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { CreateQuizDto } from '../dtos/create-quiz.dto';

export async function createFakeQuiz(lessonRepository: Repository<Lesson>): Promise<CreateQuizDto> {
    const lesson = await lessonRepository.find();

    if (lesson.length === 0) {
        throw new Error('Aucune leçon trouvée pour associer un exercice.');
      }
      
    const randomLesson = lesson[Math.floor(Math.random() * lesson.length)];

    return {
        question: faker.lorem.sentence(),
        lessonId: randomLesson.id
    };
}