import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  question: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.lectures)
  lesson: Lesson;

}