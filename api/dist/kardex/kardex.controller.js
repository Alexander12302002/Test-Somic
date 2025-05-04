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
exports.KardexController = void 0;
const common_1 = require("@nestjs/common");
const kardex_service_1 = require("./kardex.service");
const create_kardex_dto_1 = require("./dto/create-kardex.dto");
let KardexController = class KardexController {
    kardexService;
    constructor(kardexService) {
        this.kardexService = kardexService;
    }
    async create(createKardexDto) {
        try {
            const Kardex = await this.kardexService.create(createKardexDto);
            return { message: 'Kardex successfully created', Kardex };
        }
        catch (error) {
            return { message: error.message };
        }
    }
    async findAll() {
        try {
            const Kardex = await this.kardexService.findAll();
            return { message: 'Kardex successfully found', Kardex };
        }
        catch (error) {
            return { message: error.message };
        }
    }
    async findOne(nombre) {
        try {
            const Kardex = await this.kardexService.findOne(nombre);
            return { message: 'Kardex successfully found', Kardex };
        }
        catch (error) {
            return { message: error.message };
        }
    }
};
exports.KardexController = KardexController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_kardex_dto_1.CreateKardexDto]),
    __metadata("design:returntype", Promise)
], KardexController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KardexController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':nombre'),
    __param(0, (0, common_1.Param)('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KardexController.prototype, "findOne", null);
exports.KardexController = KardexController = __decorate([
    (0, common_1.Controller)('kardex'),
    __metadata("design:paramtypes", [kardex_service_1.KardexService])
], KardexController);
//# sourceMappingURL=kardex.controller.js.map