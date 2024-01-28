import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Patch, Post, Put, QueryParams, Req, UseBefore } from "routing-controllers";
import { countStart } from "../../common/helpers/pagination.helper";
import PostService from "./post.service";
import API from "../../common/config/api.types";
import { Service } from "typedi";
import { Request } from "express";
import { createPostDto, editPostDto, getPostDto } from "./dtos";

@Service()
@JsonController('/post')
export default class PostController {
    constructor(private postService: PostService) { };

 
    @Post("/create")
    @Authorized(API.Role.user)
    public async createPost(
        @Body() Data: createPostDto,
        @CurrentUser() user: any,
    ) {
        const post = await this.postService.createPost(Data,user.id);
        return post;
    }
    @Get("/list")
    @Authorized(API.Role.system)
    public async getList(
        @QueryParams() Query:getPostDto ,
    ) {
        const start = countStart(Query.page, Query.limit);
        
        const postsList = await this.postService.getList(Query.limit, start);
        return postsList;
    }
    @Get("/single/:id")
    @Authorized(API.Role.user)
    public async getPost(
        @Param("id") id: number,
    ) {
        const post = await this.postService.getPost(id);
        return post;
    }
    @Put("/edit/:id")
    @Authorized(API.Role.user)
    public async editPost(
        @Param("id") id: number,
        @Body() Data: editPostDto,
        @CurrentUser() user: any,
    ) {
        const post = await this.postService.updatePost(id,user.id, Data);
        return post;
    }
    @Delete("/delete/:id")
    @Authorized(API.Role.user)
    public async deletePost(
        @Param("id") id: number,
        @CurrentUser() user: any,
    ) {
        const post = await this.postService.deletePost(id,user.id);
        return post;
    }
    @Get("/user/list/:userId")
    @Authorized(API.Role.user)
    public async getUserPosts(
        @Param("userId") userId: number,
        @QueryParams() Query:getPostDto ,
    ) {
        const posts = await this.postService.getUserPosts(userId);
        return posts;
    }

  

}