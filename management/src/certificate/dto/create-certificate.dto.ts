import { IsString } from "class-validator";

export class CreateCertificateDto {

    @IsString()
    filename: string;

    @IsString()
    filename_url: string;

    @IsString()
    password: string;
}
