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
exports.KardexService = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
let KardexService = class KardexService {
    KardexModel;
    constructor(KardexModel) {
        this.KardexModel = KardexModel;
    }
    async create(createKardexDto) {
        const article = new this.KardexModel(createKardexDto);
        try {
            return article.save();
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Unexpected error when entering article', error);
        }
    }
    async findAll() {
        const Kardex = await this.KardexModel.find();
        if (!Kardex) {
            throw new common_1.ConflictException('dont exist Kardex');
        }
        return Kardex;
    }
    async findOne(id) {
        const objectId = new mongodb_1.ObjectId(id);
        const Kardex = await this.KardexModel.findOne({ _id: objectId });
        if (!Kardex) {
            throw new common_1.ConflictException('dont exist Kardex');
        }
        return Kardex;
    }
};
exports.KardexService = KardexService;
exports.KardexService = KardexService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('kardex', 'db1')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], KardexService);
//# sourceMappingURL=kardex.service.js.map