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
exports.ArticlesService = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
let ArticlesService = class ArticlesService {
    ArticuleModel;
    KardexModel;
    constructor(ArticuleModel, KardexModel) {
        this.ArticuleModel = ArticuleModel;
        this.KardexModel = KardexModel;
    }
    async create(createArticleDto) {
        const Createkardex = new this.KardexModel({
            Kar_Date_Admission: createArticleDto.Art_Date_Admission,
            Kar_Name: createArticleDto.Art_Name,
            Kar_laboratory: createArticleDto.Art_laboratory,
            Kar_balance: createArticleDto.Art_balance,
            Kar_cost: createArticleDto.Art_cost,
            Kar_sale_price: createArticleDto.Art_sale_price
        });
        const article = new this.ArticuleModel(createArticleDto);
        try {
            await Createkardex.save();
            return article.save();
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Unexpected error when entering article', error);
        }
    }
    async findAll() {
        const AllArticles = await this.ArticuleModel.find();
        if (!AllArticles) {
            throw new common_1.ConflictException('dont exist Articles');
        }
        return AllArticles;
    }
    async findOne(id) {
        const objectId = new mongodb_1.ObjectId(id);
        const Article = await this.ArticuleModel.findOne({ _id: objectId });
        if (!Article) {
            throw new common_1.ConflictException('dont exist Article');
        }
        return Article;
    }
    async update(id, updateArticleDto) {
        const objectId = new mongodb_1.ObjectId(id);
        const Article = await this.ArticuleModel.findById(objectId);
        if (!Article) {
            throw new common_1.ConflictException('dont exist Article');
        }
        const updatedArticle = await this.ArticuleModel.findByIdAndUpdate(objectId, updateArticleDto, { new: true });
        if (!updatedArticle) {
            throw new common_1.ConflictException('dont exist Article');
        }
        return updatedArticle;
    }
    async remove(id) {
        const objectId = new mongodb_1.ObjectId(id);
        const Article = await this.ArticuleModel.findByIdAndDelete({ _id: objectId });
        if (!Article) {
            throw new common_1.ConflictException('dont exist Article');
        }
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('articles', 'db1')),
    __param(1, (0, mongoose_2.InjectModel)('kardex', 'db1')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map