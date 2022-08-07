import { IResponse } from './response.interface';

export interface IBlogInfo {
    authorId: number,
    name: string,
    category: string,
    content: string,
    status: string,
}

export interface IBlogs {
    getAllBlog() : Promise<IResponse>;
    getBlogInfo(blogId: number) : Promise<IResponse>;
    createNewBlog(args: IBlogInfo) : Promise<IResponse>;
    editBlog(args: IBlogInfo, blogId: number): Promise<IResponse>;
    deleteBlog(blogId: number) : Promise<IResponse>;
}