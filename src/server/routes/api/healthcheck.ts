import Express, { Request, Response, NextFunction } from 'express';
const router = Express.Router();

router.get('/healthcheck', (req: Request, res: Response) => {
    return res.sendStatus(200);
});

router.get('/version', (req: Request, res: Response) => {
    return res.json({ version: '1' });
});

export {
    router as HealthCheckRouter
}