import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { CoursesModule } from '../courses/courses.module';
import { Lesson } from '../lessons/entities/lesson.entity';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course, Lesson]), CoursesModule, LessonsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
