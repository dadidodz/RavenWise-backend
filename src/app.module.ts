import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './modules/v1/users/users.module';
import { CoursesModule } from './modules/v1/courses/courses.module';
import { ChaptersModule } from './modules/v1/chapters/chapters.module';
import { LessonsModule } from './modules/v1/lessons/lessons.module';
import { ExercicesModule } from './modules/v1/exercices/exercices.module';
import { LecturesModule } from './modules/v1/lectures/lectures.module';
import { QuizzesModule } from './modules/v1/quizzes/quizzes.module';
import { QuizAnswersModule } from './modules/v1/quiz_answers/quiz_answers.module';
import { PublicationsModule } from './modules/v1/publications/publications.module';
import { MessagesModule } from './modules/v1/messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'sqlite'>('DB_TYPE'),
        database: config.get<string>('DB_PATH'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),

    UsersModule,
    CoursesModule,
    ChaptersModule,
    LessonsModule,
    ExercicesModule,
    LecturesModule,
    QuizzesModule,
    QuizAnswersModule,
    PublicationsModule,
    MessagesModule,
  ],
})
export class AppModule {}
