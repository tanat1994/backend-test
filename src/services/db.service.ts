import { DataSource } from 'typeorm';
import { databaseConfig } from '../configs/database.config';

const { type, host, port, username, password, database } = databaseConfig;
const AppDataSource = new DataSource({
    type,
    host,
    port,
    username,
    password,
    database,
    logging: false,
    synchronize: true,
    entities: ["src/entities/*.entity.ts"],
    // migrations: ["src/entities/*.entity.ts"],
    extra: {
        ssl: {
            rejectUnauthorized: false,
        }
    },
    options: { encrypt: false, }
});

export default AppDataSource;
