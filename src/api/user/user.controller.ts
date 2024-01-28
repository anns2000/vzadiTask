import { Authorized, Body, CurrentUser, Get, JsonController, Param, Patch, Post, Put, QueryParams, Req, UseBefore } from "routing-controllers";
import { createUserDto, editUserDto, getUserDto } from "./dtos";
import { countStart } from "../../common/helpers/pagination.helper";
import UserService from "./user.service";
import API from "../../common/config/api.types";
import { Service } from "typedi";

@Service()
@JsonController('/user')
export default class UserController {
    constructor(private userService: UserService) { };
   
    @Post("/create")
    public async createUser(
        @Body() Data: createUserDto,
    ) {
        const user = await this.userService.createUser(Data);
        return user;
    }
    
    @Get("/list")
    @Authorized(API.Role.system)
    public async getList(
        @QueryParams() Query: getUserDto,
    ) {
        const start = countStart(Query.page, Query.limit);
        const usersList = await this.userService.getList(Query.limit, start);
        return usersList;
    }

    @Put("/edit/:id")
    @Authorized(API.Role.system)
    public async editUser(
        @Param("id") id: number,
        @Body() Data: editUserDto,
    ) {
        const user = await this.userService.editUser(id, Data);
        return user;
    }


    @Put("/ban/:id")
    @Authorized(API.Role.admin)
    public async banUser(
        @Param("id") id: number
    ) {
        const res = await this.userService.flipUserBan(id);
        return "ok";
    }

    @Get("/single/:id")
    @Authorized(API.Role.system)
    public async getUser(
        @Param("id") id: number,
    ) {
        const user = await this.userService.getUser(id);
        return user;
    }

    

}