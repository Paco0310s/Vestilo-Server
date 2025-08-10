import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, Req } from '@nestjs/common';
import { ProductsImagesService } from './products-images.service';
import { CreateProductsImageDto } from './dto/create-products-image.dto';
import { UpdateProductsImageDto } from './dto/update-products-image.dto';
import { BaseController } from 'src/common/controllers/base.controller';
import { ProductsImage } from './products-image.entity';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Products Images')
@ApiBearerAuth('JWT-auth')
@Controller('products-images')
export class ProductsImagesController extends BaseController<ProductsImage, CreateProductsImageDto, UpdateProductsImageDto> {
  constructor(private readonly productsImagesService: ProductsImagesService) {
    super(productsImagesService);
  }

  @Post()
  @ApiBody({ 
    type: CreateProductsImageDto,
    description: 'Datos para asociar una imagen a un producto'
  })
  create(@Body() createProductsImageDto: CreateProductsImageDto, @Req() request: Request & { auditData?: any }) {
    return super.create(createProductsImageDto, request);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateProductsImageDto,
    description: 'Datos para actualizar la asociación de imagen'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductsImageDto: UpdateProductsImageDto, @Req() request: Request & { auditData?: any }) {
    return super.update(id, updateProductsImageDto, request);
  }
}
