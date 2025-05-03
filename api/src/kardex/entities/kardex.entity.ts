import { Schema, Document, Types } from "mongoose";

export const KardexSchema = new Schema({
    Kar_Date_Admission: { type: Date, require: true },
    Kar_Name_Article: { type: String, require: true },
    Kar_kind: { type: String, require: true},
    Kar_Amount: { type: Number, require: true },
    Kar_cost: { type: Number, require: true },
    Kar_Unit_Price: { type: Number, require: true },
    Kar_Total_Product: { type: Number, require: true },
    Kar_Total_cost: { type: Number, require: true },
    Kar_stock : { type: Number, require: true }
})

export interface Kardex extends Document {
    Kar_Date_Admission: Date;
    Kar_Name_Article: string;
    Kar_kind: string;
    Kar_Amount: number;
    Kar_cost: number;
    Kar_Unit_Price: number
    Kar_Total_Product: number,
    Kar_Total_cost: number,
    Kar_stock: number,
}