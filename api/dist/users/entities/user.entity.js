"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    User_Name: { type: String, require: true },
    User_LastName: { type: String, require: true },
    User_email: { type: String, require: true, unique: true },
    User_Nit: { type: String, require: true, unique: true },
    User_CC: { type: String, require: true, unique: true },
    User_quota: { type: Number, require: true },
    User_term: { type: Number, require: true },
});
//# sourceMappingURL=user.entity.js.map