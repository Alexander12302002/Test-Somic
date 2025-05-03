import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesService } from './articles.service';
import { KardexSchema } from '../kardex/entities/kardex.entity';
import { ArticleSchema } from './entities/article.entity';
import { ArticlesController } from './articles.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'articles', schema: ArticleSchema }], 'db1'),
    MongooseModule.forFeature([{ name: 'kardex', schema: KardexSchema }], 'db1')
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule { }
