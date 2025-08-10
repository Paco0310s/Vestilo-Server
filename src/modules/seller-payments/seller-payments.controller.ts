import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { SellerPaymentsService } from './seller-payments.service';
import { CreateSellerPaymentDto } from './dto/create-seller-payment.dto';
import { UpdateSellerPaymentDto } from './dto/update-seller-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { SellerPayment } from './seller-payment.entity';

@ApiTags('Seller Payments')
@Controller('seller-payments')
export class SellerPaymentsController extends BaseController<SellerPayment, CreateSellerPaymentDto, UpdateSellerPaymentDto> {
  constructor(private readonly sellerPaymentsService: SellerPaymentsService) {
    super(sellerPaymentsService);
  }
}
