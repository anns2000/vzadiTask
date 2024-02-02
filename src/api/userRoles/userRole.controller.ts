import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Patch, Post, Put, QueryParams, Req, UseBefore } from "routing-controllers";
import API from "../../common/config/api.types";
import { Service } from "typedi";
import { Request } from "express";
import userRoleService from "./userRole.service";

@Service()
@JsonController('/role')
export default class userRoleController {
    constructor(private userRoleService: userRoleService) { };

    @Authorized("admin")
    @Post("/createRole")
    async create(@Body() Data: any) {
        return await this.userRoleService.createRole(Data);
    }

    @Authorized("admin")
    @Post("/createPermission")
    async createPermission(@Body() Data: any) {
        return await this.userRoleService.createPermission(Data);
    }
   
    @Authorized("admin")
    @Get("/getAllPermissions")
    async getAllPermissions() {
        return await this.userRoleService.getAllPermissions();
    }

    @Authorized("admin")
    @Get("/getAllRoles")
    async getAllRoles() {
        return await this.userRoleService.getAllRolse();
    }

    @Authorized("admin")
    @Get("/getAll")
    async get() {
        return await this.userRoleService.getRolePermission(1);
    }

    @Authorized("admin")
    @Delete("/deleteRole/:id")
    async deleteRole(@Param("id") id: number) {
        return await this.userRoleService.deleteRole(id);
    }

    @Authorized("admin")
    @Delete("/deletePermission/:id")
    async deletePermission(@Param("id") id: number) {
        return await this.userRoleService.deletePermission(id);
    }

    @Authorized("admin")
    @Post("/createRolePermission")
    async createRolePermission(@Body() Data: any) {
        return await this.userRoleService.createRolePermission(Data);
    }

    @Authorized("admin")
    @Get("/getRolePermission")
    async getRolePermission(@QueryParams() Data: any) {
        return await this.userRoleService.getRolePermission(Data.id);
    }
    
    @Authorized("admin")
    @Put("/revokeRolePermission")
    async deleteRolePermission(@Body() Data: any) {
        return await this.userRoleService.revokeRolePermission(Data);
    }
   

   

}