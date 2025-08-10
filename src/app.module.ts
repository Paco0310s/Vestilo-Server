import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserRolesModule } from './modules/user-roles/user-roles.module';
import { ProductsModule } from './modules/products/products.module';
import { SalesModule } from './modules/sales/sales.module';
import { FilesModule } from './modules/files/files.module';
import { ProductsImagesModule } from './modules/products-images/products-images.module';
import { SellerPaymentsModule } from './modules/seller-payments/seller-payments.module';
import { ProductAssignmentsModule } from './modules/product-assignments/product-assignments.module';
import { AuthModule } from './modules/auth/auth.module';
import { SmartThrottlerGuard } from './common/guards/smart-throttler.guard';
import { envs } from './common/config/envs';
import { AuthGuard } from './modules/auth/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 segundo
        limit: 10, // 10 requests por segundo POR IP
      },
      {
        name: 'medium',
        ttl: 10000, // 10 segundos
        limit: 50, // 50 requests por 10 segundos POR IP
      },
      {
        name: 'long',
        ttl: 60000, // 1 minuto
        limit: 200, // 200 requests por minuto POR IP
      },
    ]),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: envs.db.host,
      port: envs.db.port,
      username: envs.db.username,
      password: envs.db.password,
      database: envs.db.name,
      autoLoadModels: true,
      synchronize: true, // Solo para desarrollo
      define: {
        timestamps: false, // Deshabilitamos timestamps automáticos
        paranoid: false, // Deshabilitamos paranoid por defecto (se habilitará por tabla)
        underscored: true, // Usamos snake_case para nombres de campos
      },
    }),
    UsersModule,
    RolesModule,
    UserRolesModule,
    ProductsModule,
    SalesModule,
    FilesModule,
    ProductsImagesModule,
    SellerPaymentsModule,
    ProductAssignmentsModule,
    AuthModule,
  ],
   providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: SmartThrottlerGuard,
    },
  ],
})
export class AppModule {}
