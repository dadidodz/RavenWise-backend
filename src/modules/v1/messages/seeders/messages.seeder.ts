import { promises as fs } from 'fs';
import { join } from 'path';
import { MessagesService } from '../messages.service';

export class MessagesSeeder {
  constructor(private readonly messagesService: MessagesService) {}

  async run() {
    const filePath = join(__dirname, '../../data/messages.seed.json');

    try {
      const rawData = await fs.readFile(filePath, 'utf-8');
      const messages = JSON.parse(rawData);

      for (const message of messages) {
        try {
          await this.messagesService.create(message);
          console.log(`✅ Publication "${message.title}" inséré.`);
        } catch (e) {
          console.error(`❌ Erreur insertion publication "${message.title}": ${e.message}`);
        }
      }
    } catch (e) {
      console.error(`❌ Erreur lecture du fichier JSON : ${e.message}`);
    }
  }
}
