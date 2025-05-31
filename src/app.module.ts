import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DATABASE_PATH'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
      inject: [ConfigService],
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
