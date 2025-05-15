import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { CreateLessonDto } from '../dtos/create-lesson.dto';
import { LessonType } from '../enum/lesson-type.enum';

export async function createFakeLesson(chapterRepository: Repository<Chapter>): Promise<CreateLessonDto> {
    const chapter = await chapterRepository.find();

    if (chapter.length === 0) {
        throw new Error('Aucun chapitre trouvé pour associer une leçon.');
    }
      
    const randomChapter = chapter[Math.floor(Math.random() * chapter.length)];


    return {
        title: faker.lorem.words(3),
        content: faker.lorem.sentence(),
        type: faker.helpers.arrayElement([LessonType.EXERCICE, LessonType.LECTURE, LessonType.QUIZ]),
        estimatedDuration: faker.number.int({min: 1, max: 50}),
        chapterId: randomChapter.id,
    };
}