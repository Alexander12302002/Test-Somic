import { FacturesService } from './factures.service';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
export declare class FacturesController {
    private readonly facturesService;
    constructor(facturesService: FacturesService);
    create(createFactureDto: CreateFactureDto): Promise<{
        message: string;
        user: import("./entities/facture.entity").Facture;
    } | {
        message: any;
        user?: undefined;
    }>;
    findAll(): Promise<{
        message: string;
        articles: (import("mongoose").Document<unknown, {}, import("./entities/facture.entity").Facture, {}> & import("./entities/facture.entity").Facture & Required<{
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
        Facture: import("mongoose").Document<unknown, {}, import("./entities/facture.entity").Facture, {}> & import("./entities/facture.entity").Facture & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    } | {
        message: any;
        Facture?: undefined;
    }>;
    update(id: string, updateFactureDto: UpdateFactureDto): {
        message: string;
        Facture: Promise<import("mongoose").Document<unknown, {}, import("./entities/facture.entity").Facture, {}> & import("./entities/facture.entity").Facture & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }>;
    } | {
        message: any;
        Facture?: undefined;
    };
    remove(id: string): Promise<{
        message: any;
    }>;
}
