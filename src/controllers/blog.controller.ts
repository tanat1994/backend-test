import { Request, Response, NextFunction } from 'express';
import Blogs from './classes/Blogs';

export const getAllBlog = async (req: Request, res: Response) => {
    const blogObj = new Blogs();
    const blogData = await blogObj.getAllBlog();
    return res.status(blogData.status).json(blogData);
}

export const getBlogInfo = async (req: Request<{ blogId: number}>, res: Response) => {
    const { blogId } = req.params;
    const blogObj = new Blogs();
    const blogData = await blogObj.getBlogInfo(blogId);
    return res.status(blogData.status).json(blogData);
}

export const createBlogHandler = async (req: Request, res: Response) => {
    const blogObj = new Blogs();
    const newBlog = await blogObj.createNewBlog(req.body);
    return res.status(newBlog.status).json(newBlog);
}

export const editBlogHandler = async (req: Request<
    { blogId: number }, 
    {}, 
    { name: string, status: string, content: string, category: string, authorId: number }, 
    {}>, res: Response) => {
    const { blogId } = req.params;
    const blogObj = new Blogs();
    const editBlog = await blogObj.editBlog(req.body, blogId);
    return res.status(editBlog.status).json(editBlog);
}

export const deleteBlogHandler = async (req: Request<{ blogId: number }, {}, {}, {}>, res: Response) => {
    const { blogId } = req.params;
    const blogObj = new Blogs();
    const blog = await blogObj.deleteBlog(blogId);
    return res.status(blog.status).json(blog);
}