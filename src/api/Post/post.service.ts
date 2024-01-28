import { cryptPassword } from "../../common/helpers/hashing.helper";
import { Service } from 'typedi';
import prisma from "../../common/prisma/client";
import { BadRequestError } from "routing-controllers";
import { createPostDto, editPostDto } from "./dtos";
//import { createUserDto, editUserDto } from "./dtos";

@Service()
export default class PostService {

    
    async createPost(data: createPostDto , userId: number) {
        const post = await prisma.post.create({
        data: {
            title: data.title,
            content: data.content,
            userId: userId,
            createdAt: new Date(),
        }
        });
        return post;
    }
    
    async getPost(id: number) {
        const post = await prisma.post.findUnique({
        where: {
            id
        }
        });
        return post;
    }
    
    async getList(limit: number=10, start: number=0) {
        
        const posts = await prisma.post.findMany(
        {
            take: limit,
            skip: start,
            orderBy: {
            createdAt: 'desc'
            }
        }
        );
        return posts;
    }
    async updatePost(postId: number,userId:number, data: editPostDto) {
        const oldPost = await prisma.post.findUnique({
            where: {
                    id: postId
            }
        });

        if(!oldPost) {
            throw new BadRequestError("Post not found");
        }

        if(oldPost.userId != userId) {
            throw new BadRequestError("You can't edit this post");
        }

        const post = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title: data.title,
            content: data.content,
            updatedAt: new Date(),
        }
        });
       return post;
    }
    
    async deletePost(postId: number, userId: number) {
        const oldPost = await prisma.post.findUnique({
            where: {
                id: postId
            },
            
        });

        if (!oldPost) {
            throw new BadRequestError("Post not found");
        }

        if (oldPost.userId !== userId) {
            throw new BadRequestError("You can't delete this post");
        }

        const deletedPost = await prisma.post.delete({
            where: {
                id: postId
            }
        });

        return deletedPost;
    }
    async getUserPosts(userId: number) {
        const posts = await prisma.post.findMany({
            where: {
                userId: userId
            }
        });
        return posts;
    }

   

   

}