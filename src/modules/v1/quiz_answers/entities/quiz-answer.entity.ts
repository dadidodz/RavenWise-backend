import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Quiz } from '../../quizzes/entities/quiz.entity';

@Entity('quiz_answers')
export class QuizAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  answer: string;

  @Column({ default: false })
  isCorrect: boolean;

  @ManyToOne(() => Quiz, (quiz) => quiz.answers, { onDelete: 'CASCADE' })
  quiz: Quiz;
  
}
