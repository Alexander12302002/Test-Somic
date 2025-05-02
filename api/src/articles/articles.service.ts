import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Kardex } from './entities/kardex.entity';
import { Article } from './entities/article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateArticleDto, CreateKardexDto } from './dto/create-article.dto';
import { promises } from 'dns';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('articles', 'db1') private ArticuleModel: Model<Article>,
    @InjectModel('kardex', 'db1') private KardexModel: Model<Kardex>) { }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const Createkardex = new this.KardexModel({
      Kar_Date_Admission: createArticleDto.Art_Date_Admission,
      Kar_Name: createArticleDto.Art_Name,
      Kar_laboratory: createArticleDto.Art_laboratory,
      Kar_balance: createArticleDto.Art_balance,
      Kar_cost: createArticleDto.Art_cost,
      Kar_sale_price: createArticleDto.Art_sale_price
    });
    const article = new this.ArticuleModel(createArticleDto);
    try {
      await Createkardex.save()
      return article.save();
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Unexpected error when entering article', error);
    }
  }

  async findAll() {
    const AllArticles = await this.ArticuleModel.find()
    if (!AllArticles) {
      throw new ConflictException('dont exist Articles')
    }
    return AllArticles;
  }

  async findOne(id: string): Promise<Article> {
    const objectId = new ObjectId(id)
    const Article = await this.ArticuleModel.findOne({ _id: objectId})
    if (!Article){
      throw new ConflictException('dont exist Article')
    }
    return Article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const objectId = new ObjectId(id)
    const Article = await this.ArticuleModel.findById(objectId)
    if (!Article){
      throw new ConflictException('dont exist Article')
    }
    const updatedArticle = await this.ArticuleModel.findByIdAndUpdate(objectId, updateArticleDto, { new: true })
    if (!updatedArticle){
      throw new ConflictException('dont exist Article')
    }
    return updatedArticle;
  }

  async remove(id: string) {
    const objectId = new ObjectId(id)
    const Article = await this.ArticuleModel.findByIdAndDelete({ _id: objectId})
    if (!Article){
      throw new ConflictException('dont exist Article')
    }
  }
}
