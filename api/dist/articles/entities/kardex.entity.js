"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KardexSchema = void 0;
const mongoose_1 = require("mongoose");
exports.KardexSchema = new mongoose_1.Schema({
    Kar_Date_Admission: { type: Date, require: true },
    Kar_Name: { type: String, require: true },
    Kar_laboratory: { type: String, require: true },
    Kar_balance: { type: Number, require: true },
    Kar_cost: { type: Number, require: true },
    Kar_sale_price: { type: Number, require: true },
});
//# sourceMappingURL=kardex.entity.js.map