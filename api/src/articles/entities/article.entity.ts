import { Schema, Document, Types } from "mongoose";

export const ArticleSchema = new Schema({
    Art_Date_Admission: { type: Date, require: true },
    Art_Name: { type: String, require: true },
    Art_laboratory: { type: String, require: true},
    Art_balance: { type: Number, require: true },
    Art_cost: { type: Number, require: true },
    Art_sale_price: { type: Number, require: true },
})

export interface Article extends Document {
    Art_Date_Admission: Date;
    Art_Name: string;
    Art_laboratory: string;
    Art_balance: number;
    Art_cost: number;
    Art_sale_price: number
}