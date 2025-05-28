import { IsString, MaxLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @MaxLength(150)
    user_name: string;

    @IsString()
    @MaxLength(250)
    password: string;
}
