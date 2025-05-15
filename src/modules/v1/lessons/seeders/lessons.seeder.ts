import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { LessonsService } from '../lessons.service';
import { createFakeLesson } from '../factories/lesson.factory';

export class LessonsSeeder {
  constructor(
    private readonly lessonsService: LessonsService,

    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
  ) {}

  async run(count = 40) {
    for (let i = 0; i < count; i++) {
        const lesson = await createFakeLesson(this.chapterRepository);
        try {
            await this.lessonsService.create(lesson);
            console.log(`Leçon ${lesson.title} inséré.`);
        } catch (e) {
            console.error(`Erreur insertion lessons : ${e.message}`);
        }
    }
  }
}
