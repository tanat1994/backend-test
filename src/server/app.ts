import Express from 'express';
import { server as ServerConfig } from '../configs/server.config';
import DBConnection from '../services/db.service';
import { UserRouter, BlogRouter, CategoryRouter, HealthCheckRouter } from './routes/api/index';
import { verifyAuthToken } from '../middleware/auth.middleware';

export async function getApp() {
    const app = Express();
    app.use(Express.json());
    app.use(HealthCheckRouter);
    app.use('/api/user', UserRouter);
    app.use('/api/category', CategoryRouter);
    app.use('/api/blog', verifyAuthToken, BlogRouter);
    try {
        await DBConnection.initialize();
    } catch (e) {
        console.log('Error to connect to the database', e);
    }
    return { app, ServerConfig };
}

