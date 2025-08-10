import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ProductsImagesService } from './products-images.service';
import { CreateProductsImageDto } from './dto/create-products-image.dto';
import { UpdateProductsImageDto } from './dto/update-products-image.dto';
import { BaseController } from 'src/common/controllers/base.controller';
import { ProductsImage } from './products-image.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products Images')
@Controller('products-images')
export class ProductsImagesController extends BaseController<ProductsImage> {
  constructor(private readonly productsImagesService: ProductsImagesService) {
    super(productsImagesService);
  }
}
