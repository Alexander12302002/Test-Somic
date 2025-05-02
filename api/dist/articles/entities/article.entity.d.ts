import { Schema, Document, Types } from "mongoose";
export declare const ArticleSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    Art_Date_Admission?: NativeDate | null | undefined;
    Art_Name?: string | null | undefined;
    Art_laboratory?: string | null | undefined;
    Art_balance?: number | null | undefined;
    Art_cost?: number | null | undefined;
    Art_sale_price?: number | null | undefined;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    Art_Date_Admission?: NativeDate | null | undefined;
    Art_Name?: string | null | undefined;
    Art_laboratory?: string | null | undefined;
    Art_balance?: number | null | undefined;
    Art_cost?: number | null | undefined;
    Art_sale_price?: number | null | undefined;
}>, {}> & import("mongoose").FlatRecord<{
    Art_Date_Admission?: NativeDate | null | undefined;
    Art_Name?: string | null | undefined;
    Art_laboratory?: string | null | undefined;
    Art_balance?: number | null | undefined;
    Art_cost?: number | null | undefined;
    Art_sale_price?: number | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export interface Article extends Document {
    Art_Date_Admission: Date;
    Art_Name: string;
    Art_laboratory: string;
    Art_balance: number;
    Art_cost: number;
    Art_sale_price: number;
}
