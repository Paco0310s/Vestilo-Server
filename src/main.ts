import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { globalValidationPipe } from './common/pipes/global-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS para permitir conexiones del frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3200',
    credentials: true,
  });

  // Filtros globales
  app.useGlobalFilters(new AllExceptionsFilter());
  
  // Interceptores globales
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  // Pipes de validación global
  app.useGlobalPipes(globalValidationPipe);
  
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Vestilo API')
    .setDescription(`
      ## API para el sistema Vestilo
      
      ### Características:
      - 🔐 **Autenticación JWT** con roles
      - 👥 **Gestión de usuarios** y roles
      - 📦 **Inventario de productos**
      - 💰 **Sistema de ventas**
      - 🗂️ **Gestión de archivos**
      - 📊 **Auditoría completa**
      
      ### Roles disponibles:
      - **Administrador**: Acceso completo al sistema
      - **Vendedor**: Gestión de productos y ventas
      
      ### Cómo usar:
      1. Registrarse o hacer login en \`/auth/login\`
      2. Usar el token JWT en el header Authorization
      3. Los endpoints muestran qué rol necesitas
    `)
    .setVersion('1.0')
    .setContact('Vestilo Team', 'https://vestilo.com', 'support@vestilo.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addTag('auth', '🔐 Autenticación y autorización')
    .addTag('users', '👥 Gestión de usuarios')
    .addTag('roles', '🎭 Gestión de roles')
    .addTag('products', '📦 Gestión de productos')
    .addTag('sales', '💰 Gestión de ventas')
    .addTag('files', '🗂️ Gestión de archivos')
    .addTag('audit', '📊 Funcionalidades de auditoría')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingresa tu token JWT obtenido del login',
        in: 'header',
      },
      'JWT-auth', // Este es el nombre de referencia para usar en @ApiBearerAuth()
    )
    .addServer('http://localhost:3200', 'Servidor de Desarrollo')
    .addServer('https://api.vestilo.com', 'Servidor de Producción')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Mantener autorización entre recargas
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'Vestilo API Documentation',
    customfavIcon: '/favicon.ico',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #3b82f6 }
    `,
  });
  
  console.log(`🚀 Servidor iniciado en puerto ${process.env.PORT ?? 3200}`);
  console.log(`📚 Documentación disponible en http://localhost:${process.env.PORT ?? 3200}/api/docs`);
  
  await app.listen(process.env.PORT ?? 3200);
}
bootstrap();
