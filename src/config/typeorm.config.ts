import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  port: 5432,
  database: 'taskmanagement',
  password: 'test1234',
  entities: [__dirname + '/../**/*.entities.ts'],
  synchronize: true,
};
