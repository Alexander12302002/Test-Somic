import { FacturesService } from './factures.service';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
export declare class FacturesController {
    private readonly facturesService;
    constructor(facturesService: FacturesService);
    create(createFactureDto: CreateFactureDto): Promise<{
        message: string;
        Facture: import("./entities/facture.entity").Facture;
    } | {
        message: any;
        Facture?: undefined;
    }>;
    findAll(): Promise<{
        message: string;
        Factures: (import("mongoose").Document<unknown, {}, import("./entities/facture.entity").Facture, {}> & import("./entities/facture.entity").Facture & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    } | {
        message: any;
        Factures?: undefined;
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
