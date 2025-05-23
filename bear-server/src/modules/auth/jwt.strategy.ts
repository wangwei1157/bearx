import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * 构造函数
   *
   * 初始化JWT验证策略，配置JWT解析和验证的规则
   * 这里设置了从授权头作为Bearer Token提取JWT，不忽略令牌过期，并指定了加密密钥
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 设置从授权头提取JWT的方式
      ignoreExpiration: false, // 不忽略令牌的过期时间
      secretOrKey: jwtConstants.secret, // 指定JWT的加密密钥
    });
  }

  /**
   * 异步验证函数
   *
   * 该函数接受一个参数并返回一个Promise，用于处理验证逻辑
   * 主要用于从给定的负载中提取用户ID和用户名，并将其包含在一个对象中返回
   *
   * @param payload 任意类型的负载，包含验证所需的信息
   * @returns 返回一个对象，包含用户ID（userId）和用户名（username）
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
