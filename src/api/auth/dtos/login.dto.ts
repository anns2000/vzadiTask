import { IsNotEmpty, IsObject, IsOptional, IsPositive } from "class-validator";
import { Expose } from "class-transformer";

export class loginDto{
    
    @IsNotEmpty({message: "emailOrPhone Can Not Be Empty"})
    emailOrPhone: string;
    
    @IsNotEmpty({message: "Password Can Not Be Empty"})
    password: string;

    @IsOptional()
    identifier: string;

}

export class loginResultDto{
    @Expose()
    requestId: string;

}