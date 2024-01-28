import { IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from "class-validator";
import { Expose, Transform } from "class-transformer";

export class SignupDto {

    @IsNotEmpty({ message: "phone Can Not Be Empty" })
    // @IsPhoneNumber(undefined, { message: "not a vaild phone number"})
    phone: string;

    @IsNotEmpty({ message: "name Can Not Be Empty" })
    fullname: string;

    @IsNotEmpty({ message: "Password Can Not Be Empty" })
    password: string;

}

export class SignupResultDto {
    @Expose()
    id: number;
}