// import { CoursesService } from '../courses.service';
// import { createFakeCourse } from '../factories/courses.factory';

// export class CoursesSeeder {
//   constructor(private readonly coursesService: CoursesService) {}

//   async run(count = 5) {
//     for (let i = 0; i < count; i++) {
//       const course = await createFakeCourse();
//       try {
//         await this.coursesService.create(course);
//         console.log(`Cours ${course.title} inséré.`);
//       } catch (e) {
//         console.error(`Erreur insertion utilisateur : ${e.message}`);
//       }
//     }
//   }
// }

import { CoursesService } from '../courses.service';
import { promises as fs } from 'fs';
import { join } from 'path';

export class CoursesSeeder {
  constructor(private readonly coursesService: CoursesService) {}

  async run() {
    const filePath = join(__dirname, '../../data/courses.seed.json');

    try {
      const rawData = await fs.readFile(filePath, 'utf-8');
      const courses = JSON.parse(rawData);

      for (const course of courses) {
        try {
          await this.coursesService.create(course);
          console.log(`✅ Cours "${course.title}" inséré.`);
        } catch (e) {
          console.error(`❌ Erreur insertion cours "${course.title}": ${e.message}`);
        }
      }
    } catch (e) {
      console.error(`❌ Erreur lecture du fichier JSON : ${e.message}`);
    }
  }
}
