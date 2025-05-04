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
exports.FacturesService = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
let FacturesService = class FacturesService {
    factureModel;
    ArticuleModel;
    userModel;
    KardexModel;
    constructor(factureModel, ArticuleModel, userModel, KardexModel) {
        this.factureModel = factureModel;
        this.ArticuleModel = ArticuleModel;
        this.userModel = userModel;
        this.KardexModel = KardexModel;
    }
    async create(createFactureDto) {
        const objectId = new mongodb_1.ObjectId(createFactureDto.Fac_idUser);
        const User = await this.userModel.findOne({ _id: objectId });
        if (!User) {
            throw new common_1.ConflictException('User does not exist');
        }
        if (createFactureDto.Fac_Articles && createFactureDto.Fac_Articles.length > 0) {
            const articleIds = createFactureDto.Fac_Articles.map(article => new mongodb_1.ObjectId(article.Fac_idArticle));
            const existingArticles = await this.ArticuleModel.find({ _id: { $in: articleIds } });
            const existingArticleIds = existingArticles.map(art => art.id.toString());
            const missingArticles = articleIds.filter(id => !existingArticleIds.includes(id.toString()));
            if (missingArticles.length > 0) {
                throw new common_1.ConflictException(`Los siguientes artículos no existen: ${missingArticles.join(', ')}`);
            }
            let totalFactura = 0;
            let totalCosto = 0;
            for (const articleDto of createFactureDto.Fac_Articles) {
                const articleData = existingArticles.find(a => a.id.toString() === articleDto.Fac_idArticle.toString());
                if (!articleData) {
                    throw new common_1.ConflictException(`Artículo con ID ${articleDto.Fac_idArticle} no encontrado.`);
                }
                const cantidad = Number(articleDto.Fac_Amount);
                const tipoMovimiento = articleDto.Fac_Operation;
                if (tipoMovimiento !== 'entrada' && tipoMovimiento !== 'salida') {
                    throw new common_1.ConflictException(`Tipo de movimiento inválido para el artículo ${articleData.Art_Name}. Debe ser 'Entrada' o 'Salida'.`);
                }
                if ((tipoMovimiento === 'entrada' && cantidad <= 0) ||
                    (tipoMovimiento === 'salida' && cantidad <= 0)) {
                    throw new common_1.ConflictException(`La cantidad debe ser mayor que cero para un movimiento de tipo ${tipoMovimiento} en el artículo ${articleData.Art_Name}`);
                }
                const cantidadFinal = tipoMovimiento === 'entrada' ? cantidad : -cantidad;
                const balance = Number(articleData.Art_balance);
                const precioVenta = Number(articleData.Art_sale_price);
                const costoArticulo = Number(articleData.Art_cost);
                if (tipoMovimiento === 'salida' && balance + cantidadFinal < 0) {
                    throw new common_1.ConflictException(`No hay suficiente saldo para el artículo: ${articleData.Art_Name}`);
                }
                articleDto.Fac_Unit_Price = articleDto.Fac_Unit_Price ?? precioVenta;
                articleDto.Fac_cost = costoArticulo;
                const precioUnitario = Number(articleDto.Fac_Unit_Price);
                const costoUnitario = Number(articleDto.Fac_cost);
                articleDto.Fac_Total_Product = cantidad * precioUnitario;
                articleDto.Fac_Total_cost = cantidad * costoUnitario;
                if (tipoMovimiento === 'salida' && precioVenta < costoArticulo) {
                    throw new common_1.ConflictException(`El precio de venta del artículo "${articleData.Art_Name}" no puede ser menor al costo (${costoArticulo}).`);
                }
                totalFactura += Number(articleDto.Fac_Total_Product);
                totalCosto += Number(articleDto.Fac_Total_cost);
                const articuloActualizado = await this.ArticuleModel.findById(articleData._id);
                if (!articuloActualizado) {
                    throw new common_1.ConflictException('No existe el artículo al actualizar el inventario');
                }
                const kardexEntry = new this.KardexModel({
                    Kar_Date_Admission: new Date(),
                    Kar_Name_Article: articleData.Art_Name,
                    Kar_kind: tipoMovimiento,
                    Kar_Amount: cantidad,
                    Kar_cost: costoArticulo,
                    Kar_Unit_Price: precioVenta,
                    Kar_Total_Product: articleDto.Fac_Total_Product,
                    Kar_Total_cost: articleDto.Fac_Total_cost,
                    Kar_stock: articuloActualizado.Art_balance
                });
                await kardexEntry.save();
                await this.ArticuleModel.updateOne({ _id: articleData._id }, { $inc: { Art_balance: cantidadFinal } });
            }
            if (totalFactura > User.User_quota) {
                throw new common_1.ConflictException(`El total de la factura (${totalFactura}) excede el cupo del usuario (${User.User_quota}).`);
            }
            createFactureDto.Fac_Total = totalFactura;
            createFactureDto.Fac_Total_cost = totalCosto;
        }
        const facture = new this.factureModel(createFactureDto);
        try {
            await facture.save();
            return facture;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Unexpected error when entering facture');
        }
    }
    async findAll() {
        const factures = await this.factureModel.find();
        if (!factures) {
            throw new common_1.ConflictException('dont exist factures');
        }
        return factures;
    }
    async findOne(id) {
        const objectId = new mongodb_1.ObjectId(id);
        const facture = await this.factureModel.findOne({ _id: objectId });
        if (!facture) {
            throw new common_1.ConflictException('dont exist facture');
        }
        return facture;
    }
    async update(id, updateFactureDto) {
        const objectId = new mongodb_1.ObjectId(id);
        const facture = await this.factureModel.findById(objectId);
        if (!facture) {
            throw new common_1.ConflictException('dont exist facture');
        }
        const updatedFacture = await this.factureModel.findByIdAndUpdate(objectId, updateFactureDto, { new: true });
        if (!updatedFacture) {
            throw new common_1.ConflictException('dont exist facture');
        }
        return updatedFacture;
    }
    async remove(id) {
        const objectId = new mongodb_1.ObjectId(id);
        const Facture = await this.factureModel.findByIdAndDelete({ _id: objectId });
        if (!Facture) {
            throw new common_1.ConflictException('dont exist facture');
        }
    }
};
exports.FacturesService = FacturesService;
exports.FacturesService = FacturesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('factures', 'db1')),
    __param(1, (0, mongoose_2.InjectModel)('articles', 'db1')),
    __param(2, (0, mongoose_2.InjectModel)('users', 'db1')),
    __param(3, (0, mongoose_2.InjectModel)('kardex', 'db1')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], FacturesService);
//# sourceMappingURL=factures.service.js.map