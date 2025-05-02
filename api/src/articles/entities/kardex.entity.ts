import { Schema, Document, Types } from "mongoose";

export const KardexSchema = new Schema({
    Kar_Date_Admission: { type: Date, require: true },
    Kar_Name: { type: String, require: true },
    Kar_laboratory: { type: String, require: true},
    Kar_balance: { type: Number, require: true },
    Kar_cost: { type: Number, require: true },
    Kar_sale_price: { type: Number, require: true },
})

export interface Kardex extends Document {
    Kar_Date_Admission: Date;
    Kar_Name: string;
    Kar_laboratory: string;
    Kar_balance: number;
    Kar_cost: number;
    Kar_sale_price: number
}