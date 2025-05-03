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

  async findOne(id: string) {
    const objectId = new ObjectId(id)
    const Kardex = await this.KardexModel.findOne({ _id: objectId })
    if (!Kardex) {
      throw new ConflictException('dont exist Kardex')
    }
    return Kardex;
  }
}
