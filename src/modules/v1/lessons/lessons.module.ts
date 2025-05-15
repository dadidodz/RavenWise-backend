import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson } from './entities/lesson.entity';
import { Chapter } from '../chapters/entities/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Chapter])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
