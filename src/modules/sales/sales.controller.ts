import { Controller, Post, Body, Patch, Param, ParseIntPipe, Req, Get, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { ApiTags, ApiBody, ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Request } from 'express';

@ApiTags('Sales')
@ApiBearerAuth('JWT-auth')
@Controller('sales')
export class SalesController extends BaseController<Sale, CreateSaleDto, UpdateSaleDto> {
  constructor(private readonly salesService: SalesService) {
    super(salesService);
  }

  @Post()
  @ApiBody({ 
    type: CreateSaleDto,
    description: 'Datos para registrar una nueva venta. payment_method: cash | card | transfer',
    examples: {
      ventaEfectivo: {
        summary: 'Venta en efectivo',
        value: { product_id: 10, user_id: 3, sale_price: 250.00, payment_method: 'cash' }
      },
      ventaTarjeta: {
        summary: 'Venta con tarjeta',
        value: { product_id: 11, user_id: 3, sale_price: 499.99, payment_method: 'card' }
      }
    }
  })
  create(@Body() createSaleDto: CreateSaleDto, @Req() request: Request & { auditData?: any }) {
    return super.create(createSaleDto, request);
  }

  @Get('my-sales')
  @ApiOperation({ summary: 'Obtener ventas del vendedor autenticado' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Límite de resultados por página', example: 20 })
  @ApiResponse({ status: 200, description: 'Lista de ventas del vendedor' })
  async getMySales(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Req() request: Request & { auditData?: any }
  ) {
    const userId = request.auditData?.user_id;
    if (!userId) {
      throw new Error('Usuario no identificado');
    }
    return this.salesService.findSalesByUser(userId, page, limit);
  }

  @Get('debug-commission')
  @ApiOperation({ summary: 'Debug - Ver comisiones de ventas del usuario autenticado' })
  async debugCommission(@Req() request: Request & { auditData?: any }) {
    const userId = request.auditData?.user_id;
    if (!userId) {
      throw new Error('Usuario no identificado');
    }
    return this.salesService.debugUserCommissions(userId);
  }

  @Get('my-earnings')
  @ApiOperation({ summary: 'Obtener resumen de ganancias del vendedor autenticado' })
  @ApiQuery({ name: 'period', required: false, description: 'Período de consulta: today, week, month, year', example: 'month' })
  @ApiResponse({ status: 200, description: 'Resumen de ganancias del vendedor' })
  async getMyEarnings(
    @Query('period') period: string = 'month',
    @Req() request: Request & { auditData?: any }
  ) {
    const userId = request.auditData?.user_id;
    if (!userId) {
      throw new Error('Usuario no identificado');
    }
    return this.salesService.getUserEarnings(userId, period);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateSaleDto,
    description: 'Datos para actualizar la venta'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSaleDto: UpdateSaleDto, @Req() request: Request & { auditData?: any }) {
    return super.update(id, updateSaleDto, request);
  }
}
