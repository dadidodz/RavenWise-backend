import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
