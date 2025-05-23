import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
/**
 * 处理HTTP异常的函数
 * @param exception 抛出的HttpException对象，包含错误信息和状态码
 * @param host ArgumentsHost对象，用于访问请求和响应对象
 * 此函数的目的是通过捕获异常并生成一个JSON响应来处理HttpException，从而使得客户端能够接收到详细的错误信息
 */
catch(exception: HttpException, host: ArgumentsHost) {
  // 切换到HTTP上下文，以便获取请求和响应对象
  const ctx = host.switchToHttp();
  // 获取响应对象，用于发送响应给客户端
  const response = ctx.getResponse<Response>();
  // 获取请求对象，用于获取请求信息
  const request = ctx.getRequest<Request>();
  // 获取异常状态码，用于设置响应状态
  const status = exception.getStatus();

  // 发送JSON格式的错误信息响应，包括状态码、时间戳和请求路径
  response.status(status).json({
    statusCode: status,
    timestamp: new Date().toISOString(),
    path: request.url,
  });
}
}
