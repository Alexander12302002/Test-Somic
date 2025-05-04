import { KardexService } from './kardex.service';
import { CreateKardexDto } from './dto/create-kardex.dto';
export declare class KardexController {
    private readonly kardexService;
    constructor(kardexService: KardexService);
    create(createKardexDto: CreateKardexDto): Promise<{
        message: string;
        Kardex: import("mongoose").Document<unknown, {}, import("./entities/kardex.entity").Kardex, {}> & import("./entities/kardex.entity").Kardex & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    } | {
        message: any;
        Kardex?: undefined;
    }>;
    findAll(): Promise<{
        message: string;
        Kardex: (import("mongoose").Document<unknown, {}, import("./entities/kardex.entity").Kardex, {}> & import("./entities/kardex.entity").Kardex & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    } | {
        message: any;
        Kardex?: undefined;
    }>;
    findOne(nombre: string): Promise<{
        message: string;
        Kardex: (import("mongoose").Document<unknown, {}, import("./entities/kardex.entity").Kardex, {}> & import("./entities/kardex.entity").Kardex & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    } | {
        message: any;
        Kardex?: undefined;
    }>;
}
