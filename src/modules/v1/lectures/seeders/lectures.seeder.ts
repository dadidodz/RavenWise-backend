import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { createFakeLecture } from '../factories/lecture.factory';
import { LecturesService } from '../lectures.service';


export class LecturesSeeder {
  constructor(
    private readonly lecturesService: LecturesService,

    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async run(count = 100) {
    for (let i = 0; i < count; i++) {
        const lecture = await createFakeLecture(this.lessonRepository);
        try {
            await this.lecturesService.create(lecture);
            console.log(`Lecture ${lecture.content} inséré.`);
        } catch (e) {
            console.error(`Erreur insertion lessons : ${e.message}`);
        }
    }
  }
}
