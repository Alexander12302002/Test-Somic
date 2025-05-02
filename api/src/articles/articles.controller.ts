import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    try {
      const article = await this.articlesService.create(createArticleDto);
      return { message: 'Article successfully created', article }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get()
  async findAll() {
    try {
      const articles = await this.articlesService.findAll();
      return { message: 'All Article registered', articles }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const Article = await this.articlesService.findOne(id);
      return { message: 'Article found', Article }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    try {
      const Article = this.articlesService.update(id, updateArticleDto);
      return { message: 'updated Article', Article }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.articlesService.remove(id);
      return { message: 'deleted Article' }
    } catch (error) {
      return { message: error.message };
    }
  }
}
