import { IsString, MaxLength, IsNumber, IsDate } from 'class-validator';

export class CreateKardexDto {
    @IsDate()
    Kar_Date_Admission: Date;

    @IsString()
    @MaxLength(225)
    Kar_Name_Article: string;

    @IsString()
    @MaxLength(225)
    Kar_kind: string;

    @IsNumber()
    Kar_Amount: number;

    @IsNumber()
    Kar_cost: number;

    @IsNumber()
    Kar_Unit_Price: number

    @IsNumber()
    Kar_Total_Product: number

    @IsNumber()
    Kar_Total_cost: number

    @IsNumber()
    Kar_stock: number
}