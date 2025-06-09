import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { QuizAnswer } from '../../quiz_answers/entities/quiz-answer.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  question: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.lectures, { nullable: false, onDelete: 'CASCADE' })
  lesson: Lesson;

  @OneToMany(() => QuizAnswer, (answer) => answer.quiz)
  answers: QuizAnswer[];

}