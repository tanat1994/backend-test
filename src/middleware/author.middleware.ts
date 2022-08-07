import AppDataSource from '../services/db.service';
import { UserEntity } from '../entities/User.entity';
import { BlogEntity } from '../entities/Blog.entity';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const isAuthor = async (req: Request<{ blogId: number }>, res: Response, next: NextFunction) => {
    const jwtPayload = res.locals.jwtPayload;
    const { blogId } = req.params;
    const BlogRepository = await AppDataSource.getRepository(BlogEntity);
    const blog = await BlogRepository.findOne({
        where: {
            id: blogId,
            authorId: jwtPayload.userId,
        }
    });
    if (blog) {
        next();
    } else {
        return res.status(403).send('Permission Denied');
    }
}