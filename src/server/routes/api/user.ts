import Express, { Request, Response, NextFunction } from 'express';
import { ChangeStream } from 'typeorm';
import { createNewUserHandler, loginHandler } from '../../../controllers/user.controller';

const router = Express.Router();

router.post('/register', createNewUserHandler);
router.post('/login', loginHandler);

export {
    router as UserRouter
}