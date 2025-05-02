import { Model } from 'mongoose';
import { Kardex } from './entities/kardex.entity';
import { Article } from './entities/article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
export declare class ArticlesService {
    private ArticuleModel;
    private KardexModel;
    constructor(ArticuleModel: Model<Article>, KardexModel: Model<Kardex>);
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Article, {}> & Article & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<Article>;
    update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article>;
    remove(id: string): Promise<void>;
}
