import { Schema, Document, Types } from "mongoose";
export declare const UserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    User_Name?: string | null | undefined;
    User_LastName?: string | null | undefined;
    User_email?: string | null | undefined;
    User_Nit?: string | null | undefined;
    User_CC?: string | null | undefined;
    User_quota?: number | null | undefined;
    User_term?: number | null | undefined;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    User_Name?: string | null | undefined;
    User_LastName?: string | null | undefined;
    User_email?: string | null | undefined;
    User_Nit?: string | null | undefined;
    User_CC?: string | null | undefined;
    User_quota?: number | null | undefined;
    User_term?: number | null | undefined;
}>, {}> & import("mongoose").FlatRecord<{
    User_Name?: string | null | undefined;
    User_LastName?: string | null | undefined;
    User_email?: string | null | undefined;
    User_Nit?: string | null | undefined;
    User_CC?: string | null | undefined;
    User_quota?: number | null | undefined;
    User_term?: number | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export interface User extends Document {
    User_Name: string;
    User_LastName: string;
    User_email: string;
    User_Nit: string;
    User_CC: string;
    User_quota: number;
    User_term: number;
}
