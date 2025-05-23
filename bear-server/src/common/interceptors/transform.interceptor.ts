import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 从控制器返回值中提取自定义 msg（若存在）
        const customMsg = data?.message || '';
        // 移除 data 中的 msg 字段（避免重复），保留原始业务数据
        const responseData = data?.message ? data.data : data;

        return {
          code: 200,
          data: responseData,
          message: customMsg, // 使用自定义 msg 或默认空字符串
          success: true,
        };
      }),
    );
  }
}
