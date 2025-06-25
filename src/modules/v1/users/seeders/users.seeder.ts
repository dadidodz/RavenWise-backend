// import { UsersService } from '../users.service';
// import { createFakeUser } from '../factories/user.factory';

// export class UsersSeeder {
//   constructor(private readonly usersService: UsersService) {}

//   async run(count = 20) {
//     for (let i = 0; i < count; i++) {
//       const user = await createFakeUser();
//       try {
//         await this.usersService.create(user);
//         console.log(`Utilisateur ${user.clerkId} inséré.`);
//       } catch (e) {
//         console.error(`Erreur insertion utilisateur : ${e.message}`);
//       }
//     }
//   }
// }


import { promises as fs } from 'fs';
import { join } from 'path';
import { UsersService } from '../users.service';

export class UsersSeeder {
  constructor(private readonly usersService: UsersService) {}

  async run() {
    const filePath = join(__dirname, '../../data/users.seed.json');

    try {
      const rawData = await fs.readFile(filePath, 'utf-8');
      const users = JSON.parse(rawData);

      for (const user of users) {
        try {
          await this.usersService.create(user);
          console.log(`✅ Utilisateur "${user.email}" inséré.`);
        } catch (e) {
          console.error(`❌ Erreur insertion utilisateur "${user.email}": ${e.message}`);
        }
      }
    } catch (e) {
      console.error(`❌ Erreur lecture du fichier JSON : ${e.message}`);
    }
  }
}