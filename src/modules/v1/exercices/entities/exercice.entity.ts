import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('exercices')
export class Exercice {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ type: 'boolean' })
  // obligatoire: boolean;

  // @Column({ length: 50 })
  // title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'text', nullable: true })
  deposit: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.exercices)
  lesson: Lesson;

}