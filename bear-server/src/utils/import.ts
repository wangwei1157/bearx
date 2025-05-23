import { UserModule } from '../modules/user/user.module';
import { AuthModule } from '../modules/auth/auth.module';
import { FileModule } from '../modules/file/file.module';
import { TicketModule } from '../modules/ticket/ticket.module';
import { BlogArticleModule } from 'src/modules/blog-article/blog-article.module';

export default [UserModule, AuthModule, BlogArticleModule];
