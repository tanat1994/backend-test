import { Request, Response, NextFunction } from 'express';
import { BlogCategory } from '../enum/category.enum';

export const getCategoryListHandler = (req: Request, res: Response, next: NextFunction) => {
    return res.json({ data: BlogCategory });
}