// import { faker } from '@faker-js/faker';
// import { Repository } from 'typeorm';
// import { Lesson } from '../../lessons/entities/lesson.entity';
// import { CreateQuizDto } from '../dtos/create-quiz.dto';

// export async function createFakeQuiz(lessonRepository: Repository<Lesson>): Promise<CreateQuizDto> {
//     const lesson = await lessonRepository.find();

//     if (lesson.length === 0) {
//         throw new Error('Aucune leçon trouvée pour associer un exercice.');
//       }
      
//     const randomLesson = lesson[Math.floor(Math.random() * lesson.length)];

//     return {
//         question: faker.lorem.sentence(),
//         lessonId: randomLesson.id
//     };
// }


// src/database/factories/quiz.factory.ts
import { faker } from '@faker-js/faker';
import { CreateQuizWithAnswersDto } from '../dtos/create-quiz-with-answers.dto';
import { Repository } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';

export async function createFakeQuizWithAnswers(lessonRepository: Repository<Lesson>): Promise<CreateQuizWithAnswersDto> {
    const lessons = await lessonRepository.find();
    if (lessons.length === 0) {
        throw new Error('Aucune leçon trouvée pour associer un quiz.');
    }

    const randomLesson = lessons[Math.floor(Math.random() * lessons.length)];

    const correctIndex = faker.number.int({ min: 0, max: 3 }); // Un index parmi 0..3

    const answers = Array.from({ length: 4 }, (_, i) => ({
        answer: faker.lorem.sentence(),
        isCorrect: i === correctIndex, // 1 seule réponse correcte
    }));

    return {
        question: faker.lorem.sentence() + ' ?',
        lessonId: randomLesson.id,
        answers,
    };
}
