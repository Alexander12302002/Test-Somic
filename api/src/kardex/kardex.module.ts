import { Module } from '@nestjs/common';
import { KardexService } from './kardex.service';
import { KardexController } from './kardex.controller';
import { KardexSchema } from './entities/kardex.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'kardex', schema: KardexSchema }], 'db1')
  ],
  controllers: [KardexController],
  providers: [KardexService],
})
export class KardexModule {}
