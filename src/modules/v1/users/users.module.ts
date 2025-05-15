import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course]), CoursesModule,],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
