"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKardexDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_kardex_dto_1 = require("./create-kardex.dto");
class UpdateKardexDto extends (0, mapped_types_1.PartialType)(create_kardex_dto_1.CreateKardexDto) {
}
exports.UpdateKardexDto = UpdateKardexDto;
//# sourceMappingURL=update-kardex.dto.js.map