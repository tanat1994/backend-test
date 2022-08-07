import dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
dotenv.config();

type AllowDbTypes = 'mssql' | 'postgres' | 'mysql';
interface IDatabaseConfig {
    type: AllowDbTypes;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

const DB_TYPE = process.env.DB_TYPE as AllowDbTypes || 'mssql';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 1433;
const DB_USERNAME = process.env.DB_USERNAME || 'sa';
const DB_PASSWORD = process.env.DB_PASSWORD || 'MYDB!2022';
const DB_DATABASE = process.env.DB_NAME || 'blogdb';

export const databaseConfig: IDatabaseConfig = {
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
};

