import { Controller, Post, Body, Patch, Param, ParseIntPipe, ValidationPipe, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseController } from '../../common/controllers/base.controller';
import { Product } from './product.entity';
import { AdminOnly, SellerOnly, AdminOrSeller, CurrentUser } from '../auth/decorators';

@ApiTags('products')
@Controller('products')
export class ProductsController extends BaseController<Product> {
  constructor(private readonly productsService: ProductsService) {
    super(productsService);
  }

  @Post()
  @AdminOrSeller() // Administradores y vendedores pueden crear productos
  @ApiOperation({ summary: 'Crear un nuevo producto (Administradores y Vendedores)' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: Product })
  async createProduct(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.productsService.create(createProductDto, currentUser.id);
  }

  @Patch(':id')
  @AdminOrSeller() // Administradores y vendedores pueden actualizar productos
  @ApiOperation({ summary: 'Actualizar un producto (Administradores y Vendedores)' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: 'number' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente', type: Product })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.productsService.update(id, updateProductDto, currentUser.id);
  }

  // Listar productos - Todos los usuarios autenticados pueden ver
  @Get()
  @ApiOperation({ summary: 'Ver todos los productos (Usuarios autenticados)' })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida exitosamente' })
  findAllProducts() {
    return this.productsService.findAll();
  }

  // Eliminar productos - Solo administradores
  @Patch(':id')
  @AdminOnly() // Solo administradores pueden eliminar productos
  @ApiOperation({ summary: 'Eliminar un producto (Solo Administradores)' })
  @ApiParam({ name: 'id', description: 'ID del producto a eliminar', type: 'number' })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente (soft delete)' })
  async removeProduct(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: any,
  ) {
    return this.productsService.remove(id, currentUser.id);
  }
}
