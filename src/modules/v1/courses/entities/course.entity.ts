import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { CourseDifficulty } from '../enum/course-difficulty.enum';
import { CourseCategory } from '../enum/course-category.enum';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: false })
  difficulty: CourseDifficulty;

  @Column({ type: 'text', nullable: false })
  category: CourseCategory;

  @Column({ length: 255, nullable: false })
  image: string;

  @Column({
    name: 'is_published',
    type: 'boolean',
    default: false,
  })
  isPublished: boolean;

  @ManyToMany(() => User, (user) => user.courses)
  @JoinTable({
    name: 'users_courses',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'clerkId',
    },
  })
  users: User[];

  @OneToMany(() => Chapter, chapters => chapters.course)
  chapters: Chapter[];  
}
