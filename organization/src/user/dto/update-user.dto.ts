import { IsEmail, IsInt, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsInt()
    id_user: number;

    @IsString()
    name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;
}
