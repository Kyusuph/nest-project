import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', // database type
  host: 'localhost', // where server is hosted
  username: 'postgres', // server username
  port: 5432, // server port
  database: 'taskmanagement', // database name
  password: 'test1234', // database password
  entities: [__dirname + '/../**/*.entities.ts'], // file to find entities
  synchronize: true, // synchronizing the connection after refresh, not good for production, review docs
};
