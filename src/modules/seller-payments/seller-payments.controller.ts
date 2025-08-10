import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { SellerPaymentsService } from './seller-payments.service';
import { CreateSellerPaymentDto } from './dto/create-seller-payment.dto';
import { UpdateSellerPaymentDto } from './dto/update-seller-payment.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { SellerPayment } from './seller-payment.entity';

@ApiTags('Seller Payments')
@Controller('seller-payments')
export class SellerPaymentsController extends BaseController<SellerPayment, CreateSellerPaymentDto, UpdateSellerPaymentDto> {
  constructor(private readonly sellerPaymentsService: SellerPaymentsService) {
    super(sellerPaymentsService);
  }

  @Post()
  @ApiBody({ 
    type: CreateSellerPaymentDto,
    description: 'Datos para registrar un nuevo pago a vendedor'
  })
  create(@Body() createSellerPaymentDto: CreateSellerPaymentDto) {
    return super.create(createSellerPaymentDto);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateSellerPaymentDto,
    description: 'Datos para actualizar el pago del vendedor'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSellerPaymentDto: UpdateSellerPaymentDto) {
    return super.update(id, updateSellerPaymentDto);
  }
}
