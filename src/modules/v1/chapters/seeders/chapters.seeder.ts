import { InjectRepository } from '@nestjs/typeorm';
import { ChaptersService } from '../chapters.service';
import { createFakeChapter } from '../factories/chapters.factory';
import { Course } from '../../courses/entities/course.entity';
import { Repository } from 'typeorm';

export class ChaptersSeeder {
  constructor(
    private readonly chaptersService: ChaptersService,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async run(count = 20) {
    for (let i = 0; i < count; i++) {
        const chapter = await createFakeChapter(this.courseRepository);
        try {
            await this.chaptersService.create(chapter);
            console.log(`Chapter ${chapter.title} inséré.`);
        } catch (e) {
            console.error(`Erreur insertion utilisateur : ${e.message}`);
        }
    }
  }
}
