"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        const { User_email, User_Nit, User_CC } = createUserDto;
        const existingUserEmail = await this.userModel.findOne({ User_email });
        const existingUserNit = await this.userModel.findOne({ User_Nit });
        const existingUserCC = await this.userModel.findOne({ User_CC });
        if (existingUserEmail || existingUserNit || existingUserCC) {
            throw new common_1.ConflictException('The email, Nit or CC already exists');
        }
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
    async findAll() {
        const AllUsers = await this.userModel.find();
        if (!AllUsers) {
            throw new common_1.ConflictException('dont exist users');
        }
        return AllUsers;
    }
    async findOne(id) {
        const objectId = new mongodb_1.ObjectId(id);
        const User = await this.userModel.findOne({ _id: objectId });
        if (!User) {
            throw new common_1.ConflictException('dont exist the user');
        }
        return User;
    }
    async update(id, updateUserDto) {
        const objectId = new mongodb_1.ObjectId(id);
        const user = await this.userModel.findById(objectId);
        if (!user) {
            throw new common_1.ConflictException('User not found');
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(objectId, updateUserDto, { new: true });
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return updatedUser;
    }
    async remove(id) {
        const objectId = new mongodb_1.ObjectId(id);
        const user = await this.userModel.findOneAndDelete({ _id: objectId });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('users', 'db1')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map