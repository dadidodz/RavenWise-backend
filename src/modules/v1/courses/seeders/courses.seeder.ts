import { CoursesService } from '../courses.service';
import { createFakeCourse } from '../factories/courses.factory';

export class CoursesSeeder {
  constructor(private readonly coursesService: CoursesService) {}

  async run(count = 5) {
    for (let i = 0; i < count; i++) {
      const course = await createFakeCourse();
      try {
        await this.coursesService.create(course);
        console.log(`Cours ${course.title} inséré.`);
      } catch (e) {
        console.error(`Erreur insertion utilisateur : ${e.message}`);
      }
    }
  }
}
