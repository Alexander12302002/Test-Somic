import { Schema, Document, Types } from "mongoose";

export const FactureSchema = new Schema({
    Fac_Date: { type: Date, require: true },
    Fac_idUser: { type: Schema.Types.ObjectId, ref: 'users' },
    Fac_Articles: [{
        Fac_idArticle: { type: Schema.Types.ObjectId, ref: 'articles' },
        Fac_Amount: { type: Number, require: true },
        Fac_Unit_Price: { type: Number, require: true },
        Fac_cost: { type: Number, require: true },
        Fac_Total_Product: { type: Number, require: true },
        Fac_Total_cost: { type: Number, require: true }
    }],
    Fac_Total: { type: Number, require: true },
    Fac_Total_cost: { type: Number, require: true}
})

export interface Facture extends Document {
    Fac_Date: string;
    Fac_idUser: Types.ObjectId;
    Fac_Articles: [{ Fac_idArticle: Types.ObjectId, Fac_Amount: Number, Fac_Unit_Price: Number, Fac_cost: Number, Fac_Total_Product: Number, Fac_Total_cost: Number }];
    Fac_Total: Number;
    Fac_Total_cost: { type: Number, require: true}
}