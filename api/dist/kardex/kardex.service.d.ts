import { CreateKardexDto } from './dto/create-kardex.dto';
import { UpdateKardexDto } from './dto/update-kardex.dto';
export declare class KardexService {
    create(createKardexDto: CreateKardexDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateKardexDto: UpdateKardexDto): string;
    remove(id: number): string;
}
