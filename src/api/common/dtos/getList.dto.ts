import { Transform } from "class-transformer";
import { IsOptional, IsPositive, } from "class-validator";

export class getListDto {

    @IsOptional()
    @Transform(({ value }) => parseInt(value) || null)
    @IsPositive({ message: "limit must be positive number" })
    limit: number = 10;

    @IsOptional()
    @Transform(({ value }) => parseInt(value) || null)
    @IsPositive({ message: "page must be positive number" })
    page: number = 1;

    @IsOptional()
    search?: string;
}
