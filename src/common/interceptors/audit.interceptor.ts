import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    
    // En una implementación real, obtendrías el usuario del JWT token
    // Por ahora usaremos un usuario por defecto para demostración
    const userId = request.user?.id || 1; // Usuario por defecto para demo
    
    if (method === 'POST') {
      // Para creación, establecer created_by
      if (request.body) {
        request.body.created_by = userId;
        request.body.updated_by = userId;
      }
    } else if (method === 'PATCH' || method === 'PUT') {
      // Para actualización, establecer updated_by
      if (request.body) {
        request.body.updated_by = userId;
      }
    }

    return next.handle().pipe(
      tap(() => {
        // Aquí puedes agregar logging adicional si lo necesitas
        console.log(`Audit: ${method} ${request.url} by user ${userId}`);
      }),
    );
  }
}
