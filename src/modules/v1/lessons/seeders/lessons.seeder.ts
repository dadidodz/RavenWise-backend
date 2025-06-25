// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Chapter } from '../../chapters/entities/chapter.entity';
// import { LessonsService } from '../lessons.service';
// import { createFakeLesson } from '../factories/lesson.factory';

// export class LessonsSeeder {
//   constructor(
//     private readonly lessonsService: LessonsService,

//     @InjectRepository(Chapter)
//     private readonly chapterRepository: Repository<Chapter>,
//   ) {}

//   async run(count = 40) {
//     for (let i = 0; i < count; i++) {
//         const lesson = await createFakeLesson(this.chapterRepository);
//         try {
//             await this.lessonsService.create(lesson);
//             console.log(`Leçon ${lesson.title} inséré.`);
//         } catch (e) {
//             console.error(`Erreur insertion lessons : ${e.message}`);
//         }
//     }
//   }
// }

import { promises as fs } from 'fs';
import { join } from 'path';
import { LessonsService } from '../lessons.service';

export class LessonsSeeder {
  constructor(private readonly lessonsService: LessonsService) {}

  async run() {
    const filePath = join(__dirname, '../../data/lessons.seed.json');

    try {
      const rawData = await fs.readFile(filePath, 'utf-8');
      const lessons = JSON.parse(rawData);

      for (const lesson of lessons) {
        try {
          await this.lessonsService.create(lesson);
          console.log(`✅ Leçon "${lesson.title}" inséré.`);
        } catch (e) {
          console.error(`❌ Erreur insertion leçon "${lesson.title}": ${e.message}`);
        }
      }
    } catch (e) {
      console.error(`❌ Erreur lecture du fichier JSON : ${e.message}`);
    }
  }
}
