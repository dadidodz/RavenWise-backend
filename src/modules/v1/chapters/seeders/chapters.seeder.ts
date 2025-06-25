// import { InjectRepository } from '@nestjs/typeorm';
// import { ChaptersService } from '../chapters.service';
// import { createFakeChapter } from '../factories/chapters.factory';
// import { Course } from '../../courses/entities/course.entity';
// import { Repository } from 'typeorm';

// export class ChaptersSeeder {
//   constructor(
//     private readonly chaptersService: ChaptersService,

//     @InjectRepository(Course)
//     private readonly courseRepository: Repository<Course>,
//   ) {}

//   async run(count = 20) {
//     for (let i = 0; i < count; i++) {
//         const chapter = await createFakeChapter(this.courseRepository);
//         try {
//             await this.chaptersService.create(chapter);
//             console.log(`Chapter ${chapter.title} inséré.`);
//         } catch (e) {
//             console.error(`Erreur insertion utilisateur : ${e.message}`);
//         }
//     }
//   }
// }


import { promises as fs } from 'fs';
import { join } from 'path';
import { ChaptersService } from '../chapters.service';

export class ChaptersSeeder {
  constructor(private readonly chaptersService: ChaptersService) {}

  async run() {
    const filePath = join(__dirname, '../../data/chapters.seed.json');

    try {
      const rawData = await fs.readFile(filePath, 'utf-8');
      const chapters = JSON.parse(rawData);

      for (const chapter of chapters) {
        try {
          await this.chaptersService.create(chapter);
          console.log(`✅ Chapitre "${chapter.title}" inséré.`);
        } catch (e) {
          console.error(`❌ Erreur insertion chapitre "${chapter.title}": ${e.message}`);
        }
      }
    } catch (e) {
      console.error(`❌ Erreur lecture du fichier JSON : ${e.message}`);
    }
  }
}
