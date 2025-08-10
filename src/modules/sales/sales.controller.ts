import { Controller, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { SalesService } from './sales.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@ApiTags('Sales')
@Controller('sales')
export class SalesController extends BaseController<Sale, CreateSaleDto, UpdateSaleDto> {
  constructor(private readonly salesService: SalesService) {
    super(salesService);
  }

  @Post()
  @ApiBody({ 
    type: CreateSaleDto,
    description: 'Datos para registrar una nueva venta'
  })
  create(@Body() createSaleDto: CreateSaleDto) {
    return super.create(createSaleDto);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateSaleDto,
    description: 'Datos para actualizar la venta'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSaleDto: UpdateSaleDto) {
    return super.update(id, updateSaleDto);
  }
}
