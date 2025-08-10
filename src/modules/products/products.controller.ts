import { Controller, Post, Body, Patch, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { BaseController } from '../../common/controllers/base.controller';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';

@ApiTags('Products')
@ApiBearerAuth('JWT-auth')
@Controller('products')
export class ProductsController extends BaseController<Product, CreateProductDto, UpdateProductDto> {
  constructor(private readonly productsService: ProductsService) {
    super(productsService);
  }

  @Post()
  @ApiBody({ 
    type: CreateProductDto,
    description: 'Datos para crear un nuevo producto'
  })
  create(@Body() createProductDto: CreateProductDto, @Req() request: Request & { auditData?: any }) {
    return super.create(createProductDto, request);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateProductDto,
    description: 'Datos para actualizar el producto'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto, @Req() request: Request & { auditData?: any }) {
    return super.update(id, updateProductDto, request);
  }
}
