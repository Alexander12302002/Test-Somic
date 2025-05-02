import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    create(createArticleDto: CreateArticleDto): Promise<{
        message: string;
        article: import("./entities/article.entity").Article;
    } | {
        message: any;
        article?: undefined;
    }>;
    findAll(): Promise<{
        message: string;
        articles: (import("mongoose").Document<unknown, {}, import("./entities/article.entity").Article, {}> & import("./entities/article.entity").Article & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    } | {
        message: any;
        articles?: undefined;
    }>;
    findOne(id: string): Promise<{
        message: string;
        Article: import("./entities/article.entity").Article;
    } | {
        message: any;
        Article?: undefined;
    }>;
    update(id: string, updateArticleDto: UpdateArticleDto): Promise<{
        message: string;
        Article: Promise<import("./entities/article.entity").Article>;
    } | {
        message: any;
        Article?: undefined;
    }>;
    remove(id: string): Promise<{
        message: any;
    }>;
}
