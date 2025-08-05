import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
import { ThrottlerRequest } from '@nestjs/throttler/dist/throttler.guard.interface';

@Injectable()
export class SmartThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    // Rate limiting por IP del usuario
    const clientIp = req.ips?.length ? req.ips[0] : req.ip;
    return clientIp || 'unknown';
  }

  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const route = request.route?.path || request.url;

    // Endpoints que NO necesitan rate limiting (como health checks)
    const skipRoutes = [
      '/health',
      '/api-docs',
      '/api/docs',
    ];

    return skipRoutes.some(skipRoute => route?.includes(skipRoute));
  }

  protected async getErrorMessage(
    context: ExecutionContext,
    throttlerLimitDetail: { limit: number; ttl: number; totalHits: number },
  ): Promise<string> {
    const { limit, ttl, totalHits } = throttlerLimitDetail;
    const waitTime = Math.ceil(ttl / 1000);
    
    return `Demasiadas peticiones. Límite: ${limit} por ${waitTime}s. Intentos: ${totalHits}. Espera ${waitTime} segundos.`;
  }
}
