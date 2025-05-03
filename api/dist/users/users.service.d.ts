import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Facture } from 'src/factures/entities/facture.entity';
export declare class UsersService {
    private userModel;
    private factureModel;
    constructor(userModel: Model<User>, factureModel: Model<Facture>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(cc: string): Promise<User>;
    findOneById(id: string): Promise<User>;
    findWalletUser(id: string): Promise<any[]>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
}
