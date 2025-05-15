import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { Exercice } from '../../exercices/entities/exercice.entity';
import { LessonType } from '../enum/lesson-type.enum';
import { Lecture } from '../../lectures/entities/lecture.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ name: 'estimated_duration', type: 'int', nullable: false })
  estimatedDuration: number;

  @Column({ type: 'text' })
  type: LessonType;

  @ManyToOne(() => Chapter, (chapter) => chapter.lessons, { onDelete: 'CASCADE' })
  chapter: Chapter;

  @OneToMany(() => Exercice, (exercice) => exercice.lesson)
  exercices: Exercice[];

  @OneToMany(() => Lecture, (lecture) => lecture.lesson)
  lectures: Lecture[];
}
