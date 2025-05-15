import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // jamais true en prod, on utilisera les migrations
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: false,
});
