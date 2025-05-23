import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogArticleService } from './blog-article.service';
import { CreateBlogArticleDto } from './dto/create-blog-article.dto';
import { UpdateBlogArticleDto } from './dto/update-blog-article.dto';

@Controller('blog-article')
export class BlogArticleController {
  constructor(private readonly blogArticleService: BlogArticleService) {}

  @Post()
  create(@Body() createBlogArticleDto: CreateBlogArticleDto) {
    return this.blogArticleService.create(createBlogArticleDto);
  }

  @Get()
  findAll() {
    return this.blogArticleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogArticleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogArticleDto: UpdateBlogArticleDto) {
    return this.blogArticleService.update(+id, updateBlogArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogArticleService.remove(+id);
  }
}
