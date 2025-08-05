import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserRolesModule } from './modules/user-roles/user-roles.module';
import { ProductsModule } from './modules/products/products.module';
import { SalesModule } from './modules/sales/sales.module';
import { FilesModule } from './modules/files/files.module';
import { BarcodesModule } from './modules/barcodes/barcodes.module';
import { ProductsImagesModule } from './modules/products-images/products-images.module';
import { SellerPaymentsModule } from './modules/seller-payments/seller-payments.module';
import { BarcodeAssignmentsModule } from './modules/barcode-assignments/barcode-assignments.module';
import { ProductAssignmentsModule } from './modules/product-assignments/product-assignments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'vestilo_db',
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
    BarcodesModule,
    ProductsImagesModule,
    SellerPaymentsModule,
    BarcodeAssignmentsModule,
    ProductAssignmentsModule,
  ],
})
export class AppModule {}
