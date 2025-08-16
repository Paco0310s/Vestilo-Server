import { Controller, Post, Body, Patch, Param, ParseIntPipe, Req } from '@nestjs/common';
import { SalesService } from './sales.service';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
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

  @Patch(':id')
  @ApiBody({ 
    type: UpdateSaleDto,
    description: 'Datos para actualizar la venta'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSaleDto: UpdateSaleDto, @Req() request: Request & { auditData?: any }) {
    return super.update(id, updateSaleDto, request);
  }
}
