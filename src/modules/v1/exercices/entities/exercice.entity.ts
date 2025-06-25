import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('exercices')
export class Exercice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  startingCode : string;

  @Column({ type: 'text', nullable: false })
  solution : string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'text', nullable: true })
  deposit: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.exercices)
  lesson: Lesson;

}