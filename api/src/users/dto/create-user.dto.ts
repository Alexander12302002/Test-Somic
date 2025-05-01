import { IsString, IsEmail, MaxLength, IsNumber } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(225)
    User_Name: string;

    @IsString()
    @MaxLength(225)
    User_LastName: string;

    @IsString()
    @IsEmail()
    User_email: string;

    @IsString()
    User_Nit: string;

    @IsString()
    User_CC: string;

    @IsNumber()
    User_quota: number;

    @IsNumber()
    User_term: number
}

