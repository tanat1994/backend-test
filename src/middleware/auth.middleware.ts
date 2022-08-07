import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.headers['x-access-token'];
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as Secret;
    if (!token) {
        return res.status(403).json({
            message: "Auth token is required"
        });
    }
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
        res.locals.jwtPayload = decodedToken;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            message: "invalid token"
        });
    } 
}
