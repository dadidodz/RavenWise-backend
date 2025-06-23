import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRole } from '../enum/user-role.enum';

export async function createFakeUser(): Promise<CreateUserDto> {
  // const password = await bcrypt.hash('Password123!', 10);

  return {
    clerkId: faker.string.alphanumeric(20),
    role: faker.helpers.arrayElement([UserRole.ADMIN, UserRole.FREE, UserRole.PREMIUM]),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    // password,
  };
}
