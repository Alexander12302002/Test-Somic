import { Model } from 'mongoose';
import { Facture } from './entities/facture.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdateFactureDto } from './dto/update-facture.dto';
import { CreateFactureDto } from './dto/create-facture.dto';
import { Article } from 'src/articles/entities/article.entity';
export declare class FacturesService {
    private factureModel;
    private ArticuleModel;
    private userModel;
    constructor(factureModel: Model<Facture>, ArticuleModel: Model<Article>, userModel: Model<User>);
    create(createFactureDto: CreateFactureDto): Promise<Facture>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Facture, {}> & Facture & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Facture, {}> & Facture & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateFactureDto: UpdateFactureDto): Promise<import("mongoose").Document<unknown, {}, Facture, {}> & Facture & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
}
