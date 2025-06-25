import { promises as fs } from 'fs';
import { join } from 'path';
import { PublicationsService } from '../publications.service';

export class PublicationsSeeder {
  constructor(private readonly publicationsService: PublicationsService) {}

  async run() {
    const filePath = join(__dirname, '../../data/publications.seed.json');

    try {
      const rawData = await fs.readFile(filePath, 'utf-8');
      const publications = JSON.parse(rawData);

      for (const publication of publications) {
        try {
          await this.publicationsService.create(publication);
          console.log(`✅ Publication "${publication.title}" inséré.`);
        } catch (e) {
          console.error(`❌ Erreur insertion publication "${publication.title}": ${e.message}`);
        }
      }
    } catch (e) {
      console.error(`❌ Erreur lecture du fichier JSON : ${e.message}`);
    }
  }
}
