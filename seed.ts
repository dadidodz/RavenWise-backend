import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppModule } from './src/app.module';

import { Course } from './src/modules/v1/courses/entities/course.entity';
import { Chapter } from './src/modules/v1/chapters/entities/chapter.entity';
import { Lesson } from './src/modules/v1/lessons/entities/lesson.entity';

import { UsersService } from './src/modules/v1/users/users.service';
import { CoursesService } from './src/modules/v1/courses/courses.service';
import { ChaptersService } from './src/modules/v1/chapters/chapters.service';
import { LessonsService } from './src/modules/v1/lessons/lessons.service';
import { ExercicesService } from './src/modules/v1/exercices/exercices.service';
import { LecturesService } from './src/modules/v1/lectures/lectures.service';

import { UsersSeeder } from './src/modules/v1/users/seeders/users.seeder';
import { CoursesSeeder } from './src/modules/v1/courses/seeders/courses.seeder';
import { ChaptersSeeder } from './src/modules/v1/chapters/seeders/chapters.seeder';
import { LessonsSeeder } from './src/modules/v1/lessons/seeders/lessons.seeder';
import { ExercicesSeeder } from './src/modules/v1/exercices/seeders/exercices.seeder';
import { LecturesSeeder } from './src/modules/v1/lectures/seeders/lectures.seeder';
import { QuizzesService } from './src/modules/v1/quizzes/quizzes.service';
import { QuizzesSeeder } from './src/modules/v1/quizzes/seeders/quizzes.seeder';


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const args = process.argv.slice(2);

  if (args.includes('users') || args.includes('all')) {
    const usersService = app.get(UsersService);
    const usersSeeder = new UsersSeeder(usersService);
    await usersSeeder.run();
  }

  if (args.includes('courses') || args.includes('all')) {
    const coursesService = app.get(CoursesService);
    const coursesSeeder = new CoursesSeeder(coursesService);
    await coursesSeeder.run();
  }

  if (args.includes('chapters') || args.includes('all')) {
    const chaptersService = app.get(ChaptersService);
    const courseRepository = app.get(getRepositoryToken(Course));
    const chaptersSeeder = new ChaptersSeeder(chaptersService, courseRepository);
    await chaptersSeeder.run();
  }

  if (args.includes('lessons') || args.includes('all')) {
    const lessonsService = app.get(LessonsService);
    const chapterRepository = app.get(getRepositoryToken(Chapter));
    const lessonsSeeder = new LessonsSeeder(lessonsService, chapterRepository);
    await lessonsSeeder.run();
  }

  if (args.includes('exercices') || args.includes('all')) {
    const exercicesService = app.get(ExercicesService);
    const lessonRepository = app.get(getRepositoryToken(Lesson));
    const exercicesSeeder = new ExercicesSeeder(exercicesService, lessonRepository);
    await exercicesSeeder.run();
  }

  if (args.includes('lecture') || args.includes('all')) {
    const lecturesService = app.get(LecturesService);
    const lessonRepository = app.get(getRepositoryToken(Lesson));
    const lecturesSeeder = new LecturesSeeder(lecturesService, lessonRepository);
    await lecturesSeeder.run();
  }

  if (args.includes('quiz') || args.includes('all')) {
    const quizzesService = app.get(QuizzesService);
    const lessonRepository = app.get(getRepositoryToken(Lesson));
    const quizzesSeeder = new QuizzesSeeder(quizzesService, lessonRepository);
    await quizzesSeeder.run();
  }

  await app.close();
}
bootstrap();
