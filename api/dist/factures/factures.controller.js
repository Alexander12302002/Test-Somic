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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturesController = void 0;
const factures_service_1 = require("./factures.service");
const create_facture_dto_1 = require("./dto/create-facture.dto");
const update_facture_dto_1 = require("./dto/update-facture.dto");
const common_1 = require("@nestjs/common");
let FacturesController = class FacturesController {
    facturesService;
    constructor(facturesService) {
        this.facturesService = facturesService;
    }
    async create(createFactureDto) {
        try {
            const Facture = await this.facturesService.create(createFactureDto);
            return { message: 'Facture successfully created', Facture };
        }
        catch (error) {
            return { message: error.message };
        }
    }
    async findAll() {
        try {
            const Factures = await this.facturesService.findAll();
            return { message: 'All factures registered', Factures };
        }
        catch (error) {
            return { message: error.message };
        }
    }
    async findOne(id) {
        try {
            const Facture = await this.facturesService.findOne(id);
            return { message: 'Facture found', Facture };
        }
        catch (error) {
            return { message: error.message };
        }
    }
    update(id, updateFactureDto) {
        try {
            const Facture = this.facturesService.update(id, updateFactureDto);
            return { message: 'updated Facture', Facture };
        }
        catch (error) {
            return { message: error.message };
        }
    }
    async remove(id) {
        try {
            await this.facturesService.remove(id);
            return { message: 'deleted Facture' };
        }
        catch (error) {
            return { message: error.message };
        }
    }
};
exports.FacturesController = FacturesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_facture_dto_1.CreateFactureDto]),
    __metadata("design:returntype", Promise)
], FacturesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacturesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacturesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_facture_dto_1.UpdateFactureDto]),
    __metadata("design:returntype", void 0)
], FacturesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacturesController.prototype, "remove", null);
exports.FacturesController = FacturesController = __decorate([
    (0, common_1.Controller)('factures'),
    __metadata("design:paramtypes", [factures_service_1.FacturesService])
], FacturesController);
//# sourceMappingURL=factures.controller.js.map