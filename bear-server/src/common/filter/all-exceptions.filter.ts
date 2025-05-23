import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  /**
   * 构造函数
   * @param httpAdapterHost HTTP适配器主机，用于处理与HTTP相关的操作
   */
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  /**
   * 捕获并处理异常
   *
   * 该方法主要用于捕获在应用程序中抛出的异常，并根据异常类型返回相应的HTTP状态码和错误信息
   * 它首先从httpAdapterHost中获取httpAdapter实例，然后根据异常类型确定HTTP状态码
   * 最后，它构造一个标准的错误响应体，并通过httpAdapter将响应返回给客户端
   *
   * @param exception 被捕获的异常，类型为unknown，意味着它可以接受任何类型的异常
   * @param host 异常主机对象，用于获取请求和响应对象
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    // 在构造方法中可能无法直接获取到httpAdapter，因此在这里解决它
    const { httpAdapter } = this.httpAdapterHost;

    // 切换到HTTP上下文，以便我们可以访问请求对象
    const ctx = host.switchToHttp();
    // 根据异常类型确定HTTP状态码，默认为内部服务器错误
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 构造响应体
    const responseBody = {
      code: httpStatus,
      data: null,
      message:
        exception instanceof HttpException
          ? typeof exception.getResponse() == 'string' ? exception.getResponse() : exception.getResponse()?.['message'] || '请求失败' // 提取异常消息
          : '服务器内部错误',
      success: false,
    };

    // 日志记录异常信息，便于调试和监控
    console.log(exception);
    // 使用httpAdapter发送响应
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
