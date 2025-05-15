import { UsersService } from '../users.service';
import { createFakeUser } from '../factories/user.factory';

export class UsersSeeder {
  constructor(private readonly usersService: UsersService) {}

  async run(count = 20) {
    for (let i = 0; i < count; i++) {
      const user = await createFakeUser();
      try {
        await this.usersService.create(user);
        // console.log(`Utilisateur ${user.email} inséré.`);
        console.log(`Utilisateur ${user.id} inséré.`);
      } catch (e) {
        console.error(`Erreur insertion utilisateur : ${e.message}`);
      }
    }
  }
}
