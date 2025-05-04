export declare class CreateFactureDto {
    Fac_Date: Date;
    Fac_idUser: string;
    Fac_Articles: ArticlesDTO[];
    Fac_Total: Number;
    Fac_Total_cost: Number;
}
export declare class ArticlesDTO {
    Fac_Operation: string;
    Fac_idArticle: string;
    Fac_Amount: Number;
    Fac_Unit_Price: Number;
    Fac_cost: Number;
    Fac_Total_Product: Number;
    Fac_Total_cost: Number;
}
