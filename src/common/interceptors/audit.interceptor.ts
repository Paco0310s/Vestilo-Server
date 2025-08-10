import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    
    // En una implementación real, obtendrías el usuario del JWT token
    // Por ahora usaremos un usuario por defecto para demostración
    const userId = request.user?.id || 1; // Usuario por defecto para demo
    
    // No modificamos el request.body aquí para evitar conflictos con la validación
    // En su lugar, guardamos la información de auditoría en el request
    if (method === 'POST') {
      request.auditData = {
        created_by: userId,
        updated_by: userId
      };
    } else if (method === 'PATCH' || method === 'PUT') {
      request.auditData = {
        updated_by: userId
      };
    }

    return next.handle().pipe(
      map((data) => {
        console.log(`Audit: ${method} ${request.url} by user ${userId}`);
        return data;
      }),
    );
  }
}
