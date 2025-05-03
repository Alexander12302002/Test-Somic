"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KardexService = void 0;
const common_1 = require("@nestjs/common");
let KardexService = class KardexService {
    create(createKardexDto) {
        return 'This action adds a new kardex';
    }
    findAll() {
        return `This action returns all kardex`;
    }
    findOne(id) {
        return `This action returns a #${id} kardex`;
    }
    update(id, updateKardexDto) {
        return `This action updates a #${id} kardex`;
    }
    remove(id) {
        return `This action removes a #${id} kardex`;
    }
};
exports.KardexService = KardexService;
exports.KardexService = KardexService = __decorate([
    (0, common_1.Injectable)()
], KardexService);
//# sourceMappingURL=kardex.service.js.map