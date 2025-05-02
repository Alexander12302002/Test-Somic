import { IsString, MaxLength, IsNumber, IsOptional, IsDate } from 'class-validator';

export class UpdateArticleDto {
    @IsDate()
    @IsOptional()
    Art_Date_Admission: Date;

    @IsString()
    @MaxLength(225)
    @IsOptional()
    Art_Name: string;

    @IsString()
    @MaxLength(225)
    @IsOptional()
    Art_laboratory: string;

    @IsNumber()
    @IsOptional()
    Art_balance: number;

    @IsNumber()
    @IsOptional()
    Art_cost: number;

    @IsNumber()
    @IsOptional()
    Art_sale_price: number
}

