import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, Req } from '@nestjs/common';
import { SellerPaymentsService } from './seller-payments.service';
import { CreateSellerPaymentDto } from './dto/create-seller-payment.dto';
import { UpdateSellerPaymentDto } from './dto/update-seller-payment.dto';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { SellerPayment } from './seller-payment.entity';
import { Request } from 'express';

@ApiTags('Seller Payments')
@ApiBearerAuth('JWT-auth')
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
  create(@Body() createSellerPaymentDto: CreateSellerPaymentDto, @Req() request: Request & { auditData?: any }) {
    return super.create(createSellerPaymentDto, request);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateSellerPaymentDto,
    description: 'Datos para actualizar el pago del vendedor'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSellerPaymentDto: UpdateSellerPaymentDto, @Req() request: Request & { auditData?: any }) {
    return super.update(id, updateSellerPaymentDto, request);
  }
}
