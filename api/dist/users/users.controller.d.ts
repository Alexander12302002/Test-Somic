import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: import("./entities/user.entity").User;
    } | {
        message: any;
        user?: undefined;
    }>;
    findAll(): Promise<{
        message: string;
        users: (import("mongoose").Document<unknown, {}, import("./entities/user.entity").User, {}> & import("./entities/user.entity").User & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    } | {
        message: any;
        users?: undefined;
    }>;
    findOne(id: string): Promise<{
        message: string;
        user: import("./entities/user.entity").User;
    } | {
        message: any;
        user?: undefined;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        user: import("./entities/user.entity").User;
    } | {
        message: any;
        user?: undefined;
    }>;
    remove(id: string): Promise<{
        message: any;
    }>;
}
