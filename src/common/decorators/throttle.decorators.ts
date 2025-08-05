import { applyDecorators } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

/**
 * Rate limiting personalizado para diferentes tipos de endpoints
 */

// Para endpoints de autenticación (más restrictivo para prevenir ataques de fuerza bruta)
export const AuthThrottle = () => 
  applyDecorators(
    Throttle({
      short: { limit: 5, ttl: 1000 }, // 5 intentos por segundo
      medium: { limit: 10, ttl: 10000 }, // 10 intentos por 10 segundos
      long: { limit: 20, ttl: 60000 }, // 20 intentos por minuto
    })
  );

// Para endpoints de consulta (más permisivo)
export const QueryThrottle = () =>
  applyDecorators(
    Throttle({
      short: { limit: 20, ttl: 1000 }, // 20 consultas por segundo
      medium: { limit: 100, ttl: 10000 }, // 100 consultas por 10 segundos
      long: { limit: 500, ttl: 60000 }, // 500 consultas por minuto
    })
  );

// Para endpoints de escritura/modificación (intermedio)
export const WriteThrottle = () =>
  applyDecorators(
    Throttle({
      short: { limit: 10, ttl: 1000 }, // 10 escrituras por segundo
      medium: { limit: 30, ttl: 10000 }, // 30 escrituras por 10 segundos
      long: { limit: 100, ttl: 60000 }, // 100 escrituras por minuto
    })
  );

// Para operaciones críticas (muy restrictivo)
export const CriticalThrottle = () =>
  applyDecorators(
    Throttle({
      short: { limit: 2, ttl: 1000 }, // 2 operaciones por segundo
      medium: { limit: 5, ttl: 10000 }, // 5 operaciones por 10 segundos
      long: { limit: 10, ttl: 60000 }, // 10 operaciones por minuto
    })
  );

// Para uploads de archivos (restrictivo por el peso)
export const UploadThrottle = () =>
  applyDecorators(
    Throttle({
      short: { limit: 3, ttl: 1000 }, // 3 uploads por segundo
      medium: { limit: 10, ttl: 10000 }, // 10 uploads por 10 segundos
      long: { limit: 50, ttl: 60000 }, // 50 uploads por minuto
    })
  );
