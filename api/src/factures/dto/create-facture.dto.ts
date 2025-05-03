import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested, IsDate, IsOptional } from 'class-validator';

export class CreateFactureDto {
    @IsDate()
    Fac_Date: Date

    @IsString()
    Fac_idUser: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ArticlesDTO)
    Fac_Articles: ArticlesDTO[]

    @IsNumber()
    @IsOptional()
    Fac_Total: Number

    @IsNumber()
    @IsOptional()
    Fac_Total_cost: Number
}

export class ArticlesDTO {
    @IsString()
    Fac_idArticle: string

    @IsNumber()
    Fac_Amount: Number

    @IsNumber()
    @IsOptional()
    Fac_Unit_Price: Number

    @IsNumber()
    @IsOptional()
    Fac_cost: Number

    @IsNumber()
    @IsOptional()
    Fac_Total_Product: Number

    @IsNumber()
    @IsOptional()
    Fac_Total_cost: Number
}
