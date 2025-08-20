import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { globalValidationPipe } from './common/pipes/global-validation.pipe';
import { envs } from './common/config/envs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  
  // CORS para permitir conexiones del frontend
  app.enableCors({
    origin: envs.allowedOrigins,
    credentials: true,
  });

  // Filtros globales
  app.useGlobalFilters(new AllExceptionsFilter());
  
  // Interceptores globales
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  // Pipes de validación global
  app.useGlobalPipes(globalValidationPipe);
  
  // Archivos estáticos servidos vía ServeStaticModule (ver AppModule)

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
    .setContact('Vestilo Team', 'https://vestilo.pacosotelo.com', 'paco.sotelo0310@gmail.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addTag('Auth', '🔐 Autenticación y autorización')
    .addTag('Users', '👥 Gestión de usuarios')
    .addTag('Roles', '🎭 Gestión de roles')
    .addTag('Products', '📦 Gestión de productos')
    .addTag('Sales', '💰 Gestión de ventas')
    .addTag('Files', '🗂️ Gestión de archivos')
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
    .addServer(envs.url, 'Servidor de Desarrollo')
    .addServer('https://vestilo.pacosotelo.com', 'Servidor de Producción')
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

  console.log(`🚀 Servidor iniciado en puerto ${envs.port}`);
  console.log(`📚 Documentación disponible en ${envs.url}/api/docs`);

  await app.listen(envs.port);
}
bootstrap();
