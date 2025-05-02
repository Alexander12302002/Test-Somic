"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ArticleSchema = new mongoose_1.Schema({
    Art_Date_Admission: { type: Date, require: true },
    Art_Name: { type: String, require: true },
    Art_laboratory: { type: String, require: true },
    Art_balance: { type: Number, require: true },
    Art_cost: { type: Number, require: true },
    Art_sale_price: { type: Number, require: true },
});
//# sourceMappingURL=article.entity.js.map