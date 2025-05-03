import { Model } from 'mongoose';
import { Article } from './entities/article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
export declare class ArticlesService {
    private ArticuleModel;
    constructor(ArticuleModel: Model<Article>);
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
