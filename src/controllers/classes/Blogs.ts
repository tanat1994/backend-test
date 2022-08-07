import { IBlogs, IBlogInfo } from '../../interfaces/blogs.interface';
import { BlogEntity } from '../../entities/Blog.entity';
import AppDataSource from '../../services/db.service';
import { IResponse } from '../../interfaces/response.interface';

class Blogs implements IBlogs {
    constructor () {
    }

    public async getAllBlog () : Promise<IResponse> {
        const BlogRepository = await AppDataSource.getRepository(BlogEntity);
        const blogs = await BlogRepository.createQueryBuilder("blog").getRawMany();
        return {
            status: 200,
            data: blogs,
        }
    }

    public async getBlogInfo (blogId: number) : Promise<IResponse> {
        const BlogRepository = await AppDataSource.getRepository(BlogEntity);
        const blog = await BlogRepository.findOne({
            where: {
                id: blogId,
            }
        });
        if (blog) {
            return {
                status: 200,
                data: blog,
            }
        } else {
            return {
                status: 500,
                message: "Blog does not exists",
            }
        }
    }

    public async createNewBlog (args: IBlogInfo) : Promise<IResponse> {
        const { name, category, content, status, authorId } = args;
        const BlogRepository = await AppDataSource.getRepository(BlogEntity);
        const newBlog = new BlogEntity();
        newBlog.name = name;
        newBlog.status = status;
        newBlog.content = content;
        newBlog.category = category;
        newBlog.authorId = authorId;
        await BlogRepository.save(newBlog);
        return {
            status: 200,
            message : "Blog has been created!",
        }
    }

    public async editBlog (args: IBlogInfo, blogId: number): Promise<IResponse> {
        try {
            const BlogRepository = await AppDataSource.getRepository(BlogEntity);
            const blog = await BlogRepository.findOne({
                where: {
                    id: blogId,
                }
            });
            if (blog) {
                const { content, name, status, category } = args; 
                blog.content = content;
                blog.name = name;
                blog.status = status;
                blog.category = category;
                await BlogRepository.save(blog);
                return {
                    status: 200,
                    message: "Edited complete",
                }
            } else {
                return {
                    status: 500,
                    message: "Blog not found",
                }
            }
        } catch (e: any) {
            return {
                status: 500,
                message: "Error to edit the blog",
                errorMessage: e,
            }
        }
    }

    public async deleteBlog(blogId: number): Promise<IResponse> {
        try {
            const BlogRepository = await AppDataSource.getRepository(BlogEntity);
            const blog = await BlogRepository.findOne({
                where: {
                    id: blogId,
                },
            });

            if (blog) {
                await BlogRepository.remove(blog);
                return {
                    status: 200,
                    message: "Blog has been removed!",
                }
            } else {
                return {
                    status: 500,
                    message: "Blog does not exists!",
                }
            }
        } catch (e: any) {
            return {
                status: 500,
                message: "Error when tried to delete the blog",
                errorMessage: e
            }
        }
    }
}

export default Blogs;