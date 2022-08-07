import Express, { Request, Response } from 'express';
import { verifyAuthToken } from '../../../middleware/auth.middleware';
import { isAuthor } from '../../../middleware/author.middleware';
import { getAllBlog, getBlogInfo, createBlogHandler, deleteBlogHandler, editBlogHandler } from '../../../controllers/blog.controller';

const router = Express.Router();

router.get('/', getAllBlog);
router.get('/:blogId', getBlogInfo);
router.post('/', createBlogHandler);
router.put('/:blogId', isAuthor, editBlogHandler);
router.delete('/:blogId', isAuthor, deleteBlogHandler);

export {
    router as BlogRouter
}