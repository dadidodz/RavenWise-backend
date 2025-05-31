module.exports = {
  type: 'sqlite',
  database: 'database.prod.sqlite',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
