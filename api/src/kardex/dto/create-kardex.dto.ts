import { IsString, MaxLength, IsNumber, IsDate } from 'class-validator';

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