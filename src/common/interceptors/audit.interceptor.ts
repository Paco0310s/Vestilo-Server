import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    
    // Obtener el usuario del JWT token si está disponible
    const userId = request.user?.id;
    
    // Solo establecer auditData si hay un usuario autenticado
    if (userId) {
      if (method === 'POST') {
        request.auditData = {
          created_by: userId,
          updated_by: userId,
          user_id: userId
        };
      } else if (method === 'PATCH' || method === 'PUT') {
        request.auditData = {
          updated_by: userId,
          user_id: userId
        };
      } else {
        // Para GET y otros métodos, solo establecer user_id
        request.auditData = {
          user_id: userId
        };
      }
    } else {
      // Si no hay usuario autenticado, no establecer auditData
      request.auditData = undefined;
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
