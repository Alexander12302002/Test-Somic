import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacturesService } from './factures.service';
import { FactureSchema } from './entities/facture.entity';
import { FacturesController } from './factures.controller';
import { UserSchema } from 'src/users/entities/user.entity';
import { ArticleSchema } from 'src/articles/entities/article.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'factures', schema: FactureSchema}], 'db1'),
    MongooseModule.forFeature([{ name: 'articles', schema: ArticleSchema }], 'db1'), 
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema}], 'db1')
  ],
  controllers: [FacturesController],
  providers: [FacturesService],
})
export class FacturesModule {}
