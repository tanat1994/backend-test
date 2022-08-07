import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 1338;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const API_VERSION = process.env.API_VERSION || '1';

export const server = {
    port: PORT,
    hostname: HOSTNAME,
    version: API_VERSION,
};