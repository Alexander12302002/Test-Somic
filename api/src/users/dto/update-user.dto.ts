import { IsString, MaxLength, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @MaxLength(225)
    @IsOptional()
    User_Name: string;

    @IsString()
    @MaxLength(225)
    @IsOptional()
    User_LastName: string;

    @IsNumber()
    @IsOptional()
    User_quota: number;

    @IsNumber()
    @IsOptional()
    User_term: number
}

