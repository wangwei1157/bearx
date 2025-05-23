import { Injectable } from '@nestjs/common';
import { CreateBlogArticleDto } from './dto/create-blog-article.dto';
import { UpdateBlogArticleDto } from './dto/update-blog-article.dto';

@Injectable()
export class BlogArticleService {
  create(createBlogArticleDto: CreateBlogArticleDto) {
    return 'This action adds a new blogArticle';
  }

  findAll() {
    return `This action returns all blogArticle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogArticle`;
  }

  update(id: number, updateBlogArticleDto: UpdateBlogArticleDto) {
    return `This action updates a #${id} blogArticle`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogArticle`;
  }
}
