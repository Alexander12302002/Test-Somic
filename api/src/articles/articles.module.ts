import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './entities/article.entity';
import { KardexSchema } from './entities/kardex.entity';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'articles', schema: ArticleSchema }], 'db1'),
    MongooseModule.forFeature([{ name: 'kardex', schema: KardexSchema }], 'db1')
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule { }
