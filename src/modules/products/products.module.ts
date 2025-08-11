import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import { File } from '../files/file.entity';
import { ProductsImage } from '../products-images/products-image.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product, File, ProductsImage])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
