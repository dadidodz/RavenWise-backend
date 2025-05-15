import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { QuizzesService } from '../quizzes.service';
import { createFakeQuiz } from '../factories/quiz.factory';


export class QuizzesSeeder {
  constructor(
    private readonly quizzesService: QuizzesService,

    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async run(count = 100) {
    for (let i = 0; i < count; i++) {
        const quiz = await createFakeQuiz(this.lessonRepository);
        try {
            await this.quizzesService.create(quiz);
            console.log(`Lecture ${quiz.question} inséré.`);
        } catch (e) {
            console.error(`Erreur insertion lessons : ${e.message}`);
        }
    }
  }
}
