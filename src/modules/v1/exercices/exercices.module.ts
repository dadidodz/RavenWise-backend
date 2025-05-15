import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercice } from './entities/exercice.entity';
import { ExercicesService } from './exercices.service';
import { ExercicesController } from './exercices.controller';
import { Lesson } from '../lessons/entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercice, Lesson])],
  controllers: [ExercicesController],
  providers: [ExercicesService],
})
export class ExercicesModule {}
