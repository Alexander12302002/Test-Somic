import { Module } from '@nestjs/common';
import { KardexService } from './kardex.service';
import { KardexController } from './kardex.controller';

@Module({
  controllers: [KardexController],
  providers: [KardexService],
})
export class KardexModule {}
