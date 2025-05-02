import { IsString, MaxLength, IsNumber, IsDate } from 'class-validator';

export class CreateArticleDto {
    @IsDate()
    Art_Date_Admission: Date;

    @IsString()
    @MaxLength(225)
    Art_Name: string;

    @IsString()
    @MaxLength(225)
    Art_laboratory: string;

    @IsNumber()
    Art_balance: number;

    @IsNumber()
    Art_cost: number;

    @IsNumber()
    Art_sale_price: number
}

export class CreateKardexDto {
    @IsDate()
    Kar_Date_Admission: Date;

    @IsString()
    @MaxLength(225)
    Kar_Name: string;

    @IsString()
    @MaxLength(225)
    Kar_laboratory: string;

    @IsNumber()
    Kar_balance: number;

    @IsNumber()
    Kar_cost: number;

    @IsNumber()
    Kar_sale_price: number
}
