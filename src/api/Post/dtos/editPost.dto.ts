
import { IsNotEmpty } from "class-validator";

export class editPostDto {

  
    @IsNotEmpty({ message: "title Can Not Be Empty" })
    title: string;

    @IsNotEmpty({ message: "content Can Not Be Empty" })
    content: string;
}
