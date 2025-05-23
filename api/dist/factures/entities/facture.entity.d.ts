import { Schema, Document, Types } from "mongoose";
export declare const FactureSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    Fac_Articles: Types.DocumentArray<{
        Fac_Operation?: "entrada" | "salida" | null | undefined;
        Fac_idArticle?: Types.ObjectId | null | undefined;
        Fac_Amount?: number | null | undefined;
        Fac_Unit_Price?: number | null | undefined;
        Fac_cost?: number | null | undefined;
        Fac_Total_Product?: number | null | undefined;
        Fac_Total_cost?: number | null | undefined;
    }, Types.Subdocument<Types.ObjectId, any, {
        Fac_Operation?: "entrada" | "salida" | null | undefined;
        Fac_idArticle?: Types.ObjectId | null | undefined;
        Fac_Amount?: number | null | undefined;
        Fac_Unit_Price?: number | null | undefined;
        Fac_cost?: number | null | undefined;
        Fac_Total_Product?: number | null | undefined;
        Fac_Total_cost?: number | null | undefined;
    }> & {
        Fac_Operation?: "entrada" | "salida" | null | undefined;
        Fac_idArticle?: Types.ObjectId | null | undefined;
        Fac_Amount?: number | null | undefined;
        Fac_Unit_Price?: number | null | undefined;
        Fac_cost?: number | null | undefined;
        Fac_Total_Product?: number | null | undefined;
        Fac_Total_cost?: number | null | undefined;
    }>;
    Fac_Date?: NativeDate | null | undefined;
    Fac_idUser?: Types.ObjectId | null | undefined;
    Fac_Total_cost?: number | null | undefined;
    Fac_Total?: number | null | undefined;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    Fac_Articles: Types.DocumentArray<{
        Fac_Operation?: "entrada" | "salida" | null | undefined;
        Fac_idArticle?: Types.ObjectId | null | undefined;
        Fac_Amount?: number | null | undefined;
        Fac_Unit_Price?: number | null | undefined;
        Fac_cost?: number | null | undefined;
        Fac_Total_Product?: number | null | undefined;
        Fac_Total_cost?: number | null | undefined;
    }, Types.Subdocument<Types.ObjectId, any, {
        Fac_Operation?: "entrada" | "salida" | null | undefined;
        Fac_idArticle?: Types.ObjectId | null | undefined;
        Fac_Amount?: number | null | undefined;
        Fac_Unit_Price?: number | null | undefined;
        Fac_cost?: number | null | undefined;
        Fac_Total_Product?: number | null | undefined;
        Fac_Total_cost?: number | null | undefined;
    }> & {
        Fac_Operation?: "entrada" | "salida" | null | undefined;
        Fac_idArticle?: Types.ObjectId | null | undefined;
        Fac_Amount?: number | null | undefined;
        Fac_Unit_Price?: number | null | undefined;
        Fac_cost?: number | null | undefined;
        Fac_Total_Product?: number | null | undefined;
        Fac_Total_cost?: number | null | undefined;
    }>;
    Fac_Date?: NativeDate | null | undefined;
    Fac_idUser?: Types.ObjectId | null | undefined;
    Fac_Total_cost?: number | null | undefined;
    Fac_Total?: number | null | undefined;
}>, {}> & import("mongoose").FlatRecord<{
    Fac_Articles: Types.DocumentArray<{
        Fac_Operation?: "entrada" | "salida" | null | undefined;
        Fac_idArticle?: Types.ObjectId | null | undefined;
        Fac_Amount?: number | null | undefined;
        Fac_Unit_Price?: number | null | undefined;
        Fac_cost?: number | null | undefined;
        Fac_Total_Product?: number | null | undefined;
        Fac_Total_cost?: number | null | undefined;
    }, Types.Subdocument<Types.ObjectId, any, {
        Fac_Operation?: "entrada" | "salida" | null | undefined;
        Fac_idArticle?: Types.ObjectId | null | undefined;
        Fac_Amount?: number | null | undefined;
        Fac_Unit_Price?: number | null | undefined;
        Fac_cost?: number | null | undefined;
        Fac_Total_Product?: number | null | undefined;
        Fac_Total_cost?: number | null | undefined;
    }> & {
        Fac_Operation?: "entrada" | "salida" | null | undefined;
        Fac_idArticle?: Types.ObjectId | null | undefined;
        Fac_Amount?: number | null | undefined;
        Fac_Unit_Price?: number | null | undefined;
        Fac_cost?: number | null | undefined;
        Fac_Total_Product?: number | null | undefined;
        Fac_Total_cost?: number | null | undefined;
    }>;
    Fac_Date?: NativeDate | null | undefined;
    Fac_idUser?: Types.ObjectId | null | undefined;
    Fac_Total_cost?: number | null | undefined;
    Fac_Total?: number | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export interface Facture extends Document {
    Fac_Date: string;
    Fac_idUser: Types.ObjectId;
    Fac_Articles: [{
        Fac_Operation: string;
        Fac_idArticle: Types.ObjectId;
        Fac_Amount: Number;
        Fac_Unit_Price: Number;
        Fac_cost: Number;
        Fac_Total_Product: Number;
        Fac_Total_cost: Number;
    }];
    Fac_Total: {
        type: Number;
        require: true;
    };
    Fac_Total_cost: {
        type: Number;
        require: true;
    };
}
