import { Module } from '@nestjs/common';
import { BlogArticleService } from './blog-article.service';
import { BlogArticleController } from './blog-article.controller';

@Module({
  controllers: [BlogArticleController],
  providers: [BlogArticleService],
})
export class BlogArticleModule {}
