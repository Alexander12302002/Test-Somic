"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KardexSchema = void 0;
const mongoose_1 = require("mongoose");
exports.KardexSchema = new mongoose_1.Schema({
    Kar_Date_Admission: { type: Date, require: true },
    Kar_Name_Article: { type: String, require: true },
    Kar_kind: { type: String, require: true },
    Kar_Amount: { type: Number, require: true },
    Kar_cost: { type: Number, require: true },
    Kar_Unit_Price: { type: Number, require: true },
    Kar_Total_Product: { type: Number, require: true },
    Kar_Total_cost: { type: Number, require: true },
    Kar_stock: { type: Number, require: true }
});
//# sourceMappingURL=kardex.entity.js.map