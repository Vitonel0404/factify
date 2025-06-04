import { IsEmail, IsInt, IsString } from "class-validator";

export class CreateUserDto {
    @IsInt()
    id_branch: number;

    @IsString()
    user_name: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;
}
