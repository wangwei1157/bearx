import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * 构造函数
   * @param reflector 注入的反射实例，用于反射操作
   */
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * 确定当前请求是否可以激活。
   * 此方法主要用于决定守卫的路由是否可以被激活，基于是否是公共路由以及其它权限控制。
   * @param context 上下文对象，包含请求的信息以及调用的处理程序类。
   * @returns 返回一个布尔值，指示请求是否可以继续（true）或者被阻止（false）。
   */
  canActivate(context: ExecutionContext) {
    // 获取当前请求的处理程序和类上是否标记为公共路由
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果是公共路由，则直接允许激活
    if (isPublic) {
      return true;
    }

    // 非公共路由则调用父类方法进行权限检查
    return super.canActivate(context);
  }

  /**
   * 处理请求的函数
   * @param err 错误对象，表示请求中遇到的错误
   * @param user 用户对象，表示从请求中提取的用户信息
   * @param info 额外信息对象，表示请求中的附加信息
   * 在接收到请求后，此函数负责处理请求过程中产生的错误，验证用户信息，并根据情况抛出异常或返回用户信息
   */
  handleRequest(err, user, info) {
    // 日志记录错误、用户和附加信息，有助于调试和监控
    console.log('err', err);
    console.log('user', user);
    console.log('info', info);

    // 根据"err"或"info"参数抛出异常
    // 如果存在错误"err"或用户信息无效(!user)，则抛出错误
    // 这是为了保证请求的正确性和安全性，防止未授权或错误的请求处理
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    // 返回验证通过的用户信息，以便后续流程使用
    return user;
  }
}
