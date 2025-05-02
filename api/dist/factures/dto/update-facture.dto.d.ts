export declare class UpdateFactureDto {
    Fac_Date: Date;
    Fac_idUser: string;
    Fac_Articles: UpdateArticlesDTO[];
    Fac_Total: Number;
}
export declare class UpdateArticlesDTO {
    Fac_idArticle: string;
    Fac_Amount: Number;
    Fac_Unit_Price: Number;
    Fac_Total_Product: Number;
}
