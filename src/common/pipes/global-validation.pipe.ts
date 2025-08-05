import { ValidationPipe } from '@nestjs/common';

export const globalValidationPipe = new ValidationPipe({
  // Eliminar propiedades que no están en el DTO
  whitelist: true,
  
  // Lanzar error si hay propiedades no permitidas
  forbidNonWhitelisted: true,
  
  // Transformar automáticamente los tipos
  transform: true,
  
  // Transformar propiedades primitivas
  transformOptions: {
    enableImplicitConversion: true,
  },
  
  // Personalizar mensajes de error
  exceptionFactory: (errors) => {
    const errorMessages = errors.map(error => {
      const constraints = Object.values(error.constraints || {});
      return `${error.property}: ${constraints.join(', ')}`;
    });
    
    return new Error(`Validation failed: ${errorMessages.join('; ')}`);
  },
});
