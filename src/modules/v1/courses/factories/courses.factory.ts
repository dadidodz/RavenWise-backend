import { faker } from '@faker-js/faker';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { CourseDifficulty } from '../enum/course-difficulty.enum';
import { CourseCategory } from '../enum/course-category.enum';

export async function createFakeCourse(): Promise<CreateCourseDto> {

  return {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    difficulty: faker.helpers.arrayElement([CourseDifficulty.BEGINNER, CourseDifficulty.INTERMEDIATE, CourseDifficulty.ADVANCED, CourseDifficulty.EXPERT]),
    category: faker.helpers.arrayElement([CourseCategory.WEB_DEVELOPMENT, CourseCategory.FRAMEWORK, CourseCategory.PROGRAMMING, CourseCategory.DATA_SCIENCE, CourseCategory.MOBILE_DEVELOPMENT, CourseCategory.DESIGN]),
    image: faker.image.url()
  };
}