import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { Exercice } from '../../exercices/entities/exercice.entity';
import { LessonType } from '../enum/lesson-type.enum';
import { Lecture } from '../../lectures/entities/lecture.entity';
import { IsEnum } from 'class-validator';
import { User } from '../../users/entities/user.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ name: 'estimated_duration', type: 'int', nullable: false })
  estimatedDuration: number;

  @Column({ type: 'text' })
  @IsEnum(LessonType)
  type: LessonType;

  @ManyToOne(() => Chapter, (chapter) => chapter.lessons, { onDelete: 'CASCADE' })
  chapter: Chapter;

  @OneToMany(() => Exercice, (exercice) => exercice.lesson)
  exercices: Exercice[];

  @OneToMany(() => Lecture, (lecture) => lecture.lesson)
  lectures: Lecture[];

  @ManyToMany(() => User, (user) => user.lessons)
  @JoinTable({
    name: 'users_lessons',
    joinColumn: {
      name: 'lesson_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'clerkId',
    },
  })
  users: User[];
}
