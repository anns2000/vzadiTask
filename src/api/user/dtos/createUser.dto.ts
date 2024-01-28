import { IsEmail, IsNotEmpty, IsOptional,IsPhoneNumber } from "class-validator";

export class createUserDto {

    @IsOptional()
    @IsNotEmpty({ message: "email Can Not Be Empty" })
    @IsEmail()
    email?: string;

    @IsNotEmpty({ message: "phone Can Not Be Empty" })
    @IsPhoneNumber(undefined, { message: "not a vaild phone number"})
    phone: string;

    @IsNotEmpty({ message: "name Can Not Be Empty" })
    fullname: string;

    @IsNotEmpty({ message: "Password Can Not Be Empty" })
    password: string;



}
