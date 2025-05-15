import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('chapters')
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ length: 50 })
  // title: string;
  @Column({ unique: true, nullable: false, length: 255 })
  title: string;

  // @Column({ length: 255 })
  // description: string;
  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Course, course => course.chapters, { onDelete: 'CASCADE' })
  course: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.chapter)
  lessons: Lesson[];
}
