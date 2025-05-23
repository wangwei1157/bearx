import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { RedisClientOptions } from 'redis';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
// import { HttpModule } from '@nestjs/axios';
import importModules from './utils/import';
@Module({
  imports: [
    // HttpModule,
    ConfigModule.forRoot({
      load: [() => configuration],
    }),
    TypeOrmModule.forRoot(configuration.db),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      ...configuration.redis,
    }),
    ...importModules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  /**
   * 构造函数
   * @param dataSource 数据源对象，用于管理和访问数据
   */
  constructor(private dataSource: DataSource) {}
  /**
   * 配置中间件消费者
   * @param consumer MiddlewareConsumer实例，用于构建中间件链
   */
  configure(consumer: MiddlewareConsumer) {
    // 将LoggerMiddleware应用到所有路径和请求方法
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
