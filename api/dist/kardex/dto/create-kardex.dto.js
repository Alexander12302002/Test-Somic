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
exports.CreateKardexDto = void 0;
const class_validator_1 = require("class-validator");
class CreateKardexDto {
    Kar_Date_Admission;
    Kar_Name;
    Kar_laboratory;
    Kar_balance;
    Kar_cost;
    Kar_sale_price;
}
exports.CreateKardexDto = CreateKardexDto;
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateKardexDto.prototype, "Kar_Date_Admission", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(225),
    __metadata("design:type", String)
], CreateKardexDto.prototype, "Kar_Name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(225),
    __metadata("design:type", String)
], CreateKardexDto.prototype, "Kar_laboratory", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateKardexDto.prototype, "Kar_balance", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateKardexDto.prototype, "Kar_cost", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateKardexDto.prototype, "Kar_sale_price", void 0);
//# sourceMappingURL=create-kardex.dto.js.map