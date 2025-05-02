import { Schema, Document, Types } from "mongoose";

export const UserSchema = new Schema({
    User_Name: { type: String, require: true },
    User_LastName: { type: String, require: true },
    User_email: { type: String, require: true, },
    User_Nit: { type: String, require: true,},
    User_CC: { type: String, require: true,},
    User_quota: { type: Number, require: true },
    User_term: { type: Number, require: true },
})

export interface User extends Document {
    User_Name: string;
    User_LastName: string;
    User_email: string;
    User_Nit: string;
    User_CC: string;
    User_quota: number;
    User_term: number
}