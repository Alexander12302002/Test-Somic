import { KardexService } from './kardex.service';
import { CreateKardexDto } from './dto/create-kardex.dto';
import { UpdateKardexDto } from './dto/update-kardex.dto';
export declare class KardexController {
    private readonly kardexService;
    constructor(kardexService: KardexService);
    create(createKardexDto: CreateKardexDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateKardexDto: UpdateKardexDto): string;
    remove(id: string): string;
}
