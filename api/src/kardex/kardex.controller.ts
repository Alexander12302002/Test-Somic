import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KardexService } from './kardex.service';
import { CreateKardexDto } from './dto/create-kardex.dto';
import { UpdateKardexDto } from './dto/update-kardex.dto';

@Controller('kardex')
export class KardexController {
  constructor(private readonly kardexService: KardexService) {}

  @Post()
  async create(@Body() createKardexDto: CreateKardexDto) {
    try {
      const Kardex = await this.kardexService.create(createKardexDto);
      return { message: 'Kardex successfully created', Kardex }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get()
  async findAll() {
    try {
      const Kardex = await this.kardexService.findAll();
      return { message: 'Kardex successfully found', Kardex }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const Kardex = await this.kardexService.findOne(id);
      return { message: 'Kardex successfully found', Kardex }
    } catch (error) {
      return { message: error.message };
    }
  }
}
