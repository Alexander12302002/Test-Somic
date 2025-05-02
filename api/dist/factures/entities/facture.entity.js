"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactureSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FactureSchema = new mongoose_1.Schema({
    Fac_Date: { type: Date, require: true },
    Fac_idUser: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    Fac_Articles: [{
            Fac_idArticle: { type: mongoose_1.Schema.Types.ObjectId, ref: 'articles' },
            Fac_Amount: { type: Number, require: true },
            Fac_Unit_Price: { type: Number, require: true },
            Fac_Total_Product: { type: Number, require: true }
        }],
    Fac_Total: { type: Number, require: true },
});
//# sourceMappingURL=facture.entity.js.map