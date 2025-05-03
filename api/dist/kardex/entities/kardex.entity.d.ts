import { Schema, Document, Types } from "mongoose";
export declare const KardexSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    Kar_Date_Admission?: NativeDate | null | undefined;
    Kar_Name?: string | null | undefined;
    Kar_laboratory?: string | null | undefined;
    Kar_balance?: number | null | undefined;
    Kar_cost?: number | null | undefined;
    Kar_sale_price?: number | null | undefined;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    Kar_Date_Admission?: NativeDate | null | undefined;
    Kar_Name?: string | null | undefined;
    Kar_laboratory?: string | null | undefined;
    Kar_balance?: number | null | undefined;
    Kar_cost?: number | null | undefined;
    Kar_sale_price?: number | null | undefined;
}>, {}> & import("mongoose").FlatRecord<{
    Kar_Date_Admission?: NativeDate | null | undefined;
    Kar_Name?: string | null | undefined;
    Kar_laboratory?: string | null | undefined;
    Kar_balance?: number | null | undefined;
    Kar_cost?: number | null | undefined;
    Kar_sale_price?: number | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export interface Kardex extends Document {
    Kar_Date_Admission: Date;
    Kar_Name: string;
    Kar_laboratory: string;
    Kar_balance: number;
    Kar_cost: number;
    Kar_sale_price: number;
}
