import { FacturesService } from './factures.service';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

@Controller('factures')
export class FacturesController {
  constructor(private readonly facturesService: FacturesService) {}

  @Post()
  async create(@Body() createFactureDto: CreateFactureDto) {
    try {
      const user = await this.facturesService.create(createFactureDto);
      return { message: 'Facture successfully created', user }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get()
  async findAll() {
    try {
      const articles = await this.facturesService.findAll();
      return { message: 'All factures registered', articles }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const Facture = await this.facturesService.findOne(id);
      return { message: 'Facture found', Facture }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFactureDto: UpdateFactureDto) {
    try {
      const Facture = this.facturesService.update(id, updateFactureDto);
      return { message: 'updated Facture', Facture }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.facturesService.remove(id);
      return { message: 'deleted Facture' }
    } catch (error) {
      return { message: error.message };
    }
  }
  }

