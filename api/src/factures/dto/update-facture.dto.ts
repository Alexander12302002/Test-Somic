import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested, IsOptional, IsDate } from 'class-validator';

export class UpdateFactureDto {
    @IsDate()
    @IsOptional()
    Fac_Date: Date

    @IsString()
    @IsOptional()
    Fac_idUser: string

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpdateArticlesDTO)
    Fac_Articles: UpdateArticlesDTO[]

    @IsNumber()
    @IsOptional()
    Fac_Total: Number
}

export class UpdateArticlesDTO {
    @IsString()
    @IsOptional()
    Fac_idArticle: string

    @IsNumber()
    @IsOptional()
    Fac_Amount: Number

    @IsNumber()
    @IsOptional()
    Fac_Unit_Price: Number

    @IsNumber()
    @IsOptional()
    Fac_Total_Product: Number
}
