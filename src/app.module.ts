import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/v1/users/users.module';
import { CoursesModule } from './modules/v1/courses/courses.module';
import { ChaptersModule } from './modules/v1/chapters/chapters.module';
import { LessonsModule } from './modules/v1/lessons/lessons.module';
import { ExercicesModule } from './modules/v1/exercices/exercices.module';
import { LecturesModule } from './modules/v1/lectures/lectures.module';
import { QuizzesModule } from './modules/v1/quizzes/quizzes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UsersModule,
    CoursesModule,
    ChaptersModule,
    LessonsModule,
    ExercicesModule,
    LecturesModule,
    QuizzesModule,
  ],
})
export class AppModule {}
