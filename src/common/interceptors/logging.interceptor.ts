import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, body, user } = request;
    const userAgent = request.get('User-Agent') || '';
    const ip = request.ip;

    const now = Date.now();
    
    this.logger.log(
      `Incoming Request: ${method} ${url} - User: ${user?.email || 'Anonymous'} - IP: ${ip} - UserAgent: ${userAgent}`
    );

    return next.handle().pipe(
      tap({
        next: (responseBody) => {
          const duration = Date.now() - now;
          this.logger.log(
            `Outgoing Response: ${method} ${url} - ${response.statusCode} - ${duration}ms`
          );
        },
        error: (error) => {
          const duration = Date.now() - now;
          this.logger.error(
            `Error Response: ${method} ${url} - ${error.status || 500} - ${duration}ms - Error: ${error.message}`
          );
        },
      }),
    );
  }
}
