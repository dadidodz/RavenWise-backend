import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExercicesService } from '../exercices.service';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { createFakeExercice } from '../factories/exercice.factory';

export class ExercicesSeeder {
  constructor(
    private readonly exercicesService: ExercicesService,

    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async run(count = 100) {
    for (let i = 0; i < count; i++) {
        const exercice = await createFakeExercice(this.lessonRepository);
        try {
            await this.exercicesService.create(exercice);
            console.log(`Exercice ${exercice.content} inséré.`);
        } catch (e) {
            console.error(`Erreur insertion lessons : ${e.message}`);
        }
    }
  }
}
