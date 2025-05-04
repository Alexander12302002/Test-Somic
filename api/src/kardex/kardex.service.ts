import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Kardex } from './entities/kardex.entity';
import { CreateKardexDto } from './dto/create-kardex.dto';
import { UpdateKardexDto } from './dto/update-kardex.dto';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class KardexService {
  constructor(
    @InjectModel('kardex', 'db1') private KardexModel: Model<Kardex>) { }
  
  async create(createKardexDto: CreateKardexDto) {
    const article = new this.KardexModel(createKardexDto);
    try {
      return article.save();
    } catch (error) {
      console.log(error)
    throw new InternalServerErrorException('Unexpected error when entering article', error);
    }
  }

  async findAll() {
  const Kardex = await this.KardexModel.find()
      if (!Kardex) {
        throw new ConflictException('dont exist Kardex')
      }
    return Kardex;
  }

  async findOne(nombre: string) {
    const kardexEntries = await this.KardexModel.find({
      Kar_Name_Article: { $regex: new RegExp(`^${nombre}$`, 'i') } 
    });
  
    if (!kardexEntries || kardexEntries.length === 0) {
      throw new ConflictException('No existe Kardex');
    }
  
    return kardexEntries;
  }
  
}
