import { Model } from 'mongoose';
import { Kardex } from './entities/kardex.entity';
import { CreateKardexDto } from './dto/create-kardex.dto';
export declare class KardexService {
    private KardexModel;
    constructor(KardexModel: Model<Kardex>);
    create(createKardexDto: CreateKardexDto): Promise<import("mongoose").Document<unknown, {}, Kardex, {}> & Kardex & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Kardex, {}> & Kardex & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(nombre: string): Promise<(import("mongoose").Document<unknown, {}, Kardex, {}> & Kardex & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
