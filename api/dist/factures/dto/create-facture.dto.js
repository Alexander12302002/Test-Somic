"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesDTO = exports.CreateFactureDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateFactureDto {
    Fac_Date;
    Fac_idUser;
    Fac_Articles;
    Fac_Total;
    Fac_Total_cost;
}
exports.CreateFactureDto = CreateFactureDto;
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateFactureDto.prototype, "Fac_Date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFactureDto.prototype, "Fac_idUser", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ArticlesDTO),
    __metadata("design:type", Array)
], CreateFactureDto.prototype, "Fac_Articles", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateFactureDto.prototype, "Fac_Total", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateFactureDto.prototype, "Fac_Total_cost", void 0);
class ArticlesDTO {
    Fac_Operation;
    Fac_idArticle;
    Fac_Amount;
    Fac_Unit_Price;
    Fac_cost;
    Fac_Total_Product;
    Fac_Total_cost;
}
exports.ArticlesDTO = ArticlesDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["entrada", "salida"]),
    __metadata("design:type", String)
], ArticlesDTO.prototype, "Fac_Operation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ArticlesDTO.prototype, "Fac_idArticle", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ArticlesDTO.prototype, "Fac_Amount", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ArticlesDTO.prototype, "Fac_Unit_Price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ArticlesDTO.prototype, "Fac_cost", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ArticlesDTO.prototype, "Fac_Total_Product", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ArticlesDTO.prototype, "Fac_Total_cost", void 0);
//# sourceMappingURL=create-facture.dto.js.map