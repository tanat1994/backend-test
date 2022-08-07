import { Request, Response, NextFunction } from 'express';
import User from './classes/User';

export const createNewUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    const userObject = new User(username);
    const userRegister = await userObject.register();
    return res.status(userRegister.status).json(userRegister);
}

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const userObject = new User(username, password);
    const userLogin = await userObject.login();
    return res.status(userLogin.status).json(userLogin);
}