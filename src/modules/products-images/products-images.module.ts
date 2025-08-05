import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsImagesService } from './products-images.service';
import { ProductsImagesController } from './products-images.controller';
import { ProductsImage } from './products-image.entity';

@Module({
  imports: [SequelizeModule.forFeature([ProductsImage])],
  controllers: [ProductsImagesController],
  providers: [ProductsImagesService],
})
export class ProductsImagesModule {}
