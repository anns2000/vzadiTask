import { Body, JsonController, Post, UploadedFile, Req} from "routing-controllers";
import { adminLoginDto, loginDto, loginResultDto, SignupDto, SignupResultDto } from "./dtos";
import AuthService from "./auth.service";
import { Service } from "typedi";
import { Request } from "express";
import { v4 as uuid } from 'uuid';
import UserService from "../user/user.service";

@JsonController('/auth')
@Service()
export default class AuthController {
    constructor(private userService: UserService, private authService: AuthService ){};

    @Post("/admin/login")
    public async adminLogin(@Body() Data: adminLoginDto, @Req() req: Request){
        const source = req.useragent?.source || "";
        Data.identifier = Data.identifier || uuid() || "";
        const res = await this.authService.adminLogin(Data.emailOrPhone, Data.password, Data.identifier, source);
        return res;
    }

    @Post("/user/login")
    public async userLogin(@Body() Data: loginDto, @Req() req: Request){
        const source = req.useragent?.source || "";
        Data.identifier = Data.identifier || uuid() || "";
        const res = await this.authService.userLogin(Data.emailOrPhone, Data.password, Data.identifier, source);

        return res ;
    }
    @Post("/system/login")
    public async systemLogin(@Body() Data: loginDto, @Req() req: Request){
        const source = req.useragent?.source || "";
        Data.identifier = Data.identifier || uuid() || "";
        const res = await this.authService.systemLogin(Data.emailOrPhone, Data.password, Data.identifier, source);
        
        return res;
    }

   

}