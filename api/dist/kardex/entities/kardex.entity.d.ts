import { Schema, Document, Types } from "mongoose";
export declare const KardexSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    Kar_Date_Admission?: NativeDate | null | undefined;
    Kar_cost?: number | null | undefined;
    Kar_Name_Article?: string | null | undefined;
    Kar_kind?: string | null | undefined;
    Kar_Amount?: number | null | undefined;
    Kar_Unit_Price?: number | null | undefined;
    Kar_Total_Product?: number | null | undefined;
    Kar_Total_cost?: number | null | undefined;
    Kar_stock?: number | null | undefined;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    Kar_Date_Admission?: NativeDate | null | undefined;
    Kar_cost?: number | null | undefined;
    Kar_Name_Article?: string | null | undefined;
    Kar_kind?: string | null | undefined;
    Kar_Amount?: number | null | undefined;
    Kar_Unit_Price?: number | null | undefined;
    Kar_Total_Product?: number | null | undefined;
    Kar_Total_cost?: number | null | undefined;
    Kar_stock?: number | null | undefined;
}>, {}> & import("mongoose").FlatRecord<{
    Kar_Date_Admission?: NativeDate | null | undefined;
    Kar_cost?: number | null | undefined;
    Kar_Name_Article?: string | null | undefined;
    Kar_kind?: string | null | undefined;
    Kar_Amount?: number | null | undefined;
    Kar_Unit_Price?: number | null | undefined;
    Kar_Total_Product?: number | null | undefined;
    Kar_Total_cost?: number | null | undefined;
    Kar_stock?: number | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export interface Kardex extends Document {
    Kar_Date_Admission: Date;
    Kar_Name_Article: string;
    Kar_kind: string;
    Kar_Amount: number;
    Kar_cost: number;
    Kar_Unit_Price: number;
    Kar_Total_Product: number;
    Kar_Total_cost: number;
    Kar_stock: number;
}
