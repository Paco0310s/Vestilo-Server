import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { SellerPaymentsService } from './seller-payments.service';
import { CreateSellerPaymentDto } from './dto/create-seller-payment.dto';
import { UpdateSellerPaymentDto } from './dto/update-seller-payment.dto';

@Controller('seller-payments')
export class SellerPaymentsController {
  constructor(private readonly sellerPaymentsService: SellerPaymentsService) {}

  @Post()
  create(@Body(ValidationPipe) createSellerPaymentDto: CreateSellerPaymentDto) {
    return this.sellerPaymentsService.create(createSellerPaymentDto);
  }

  @Get()
  findAll() {
    return this.sellerPaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerPaymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateSellerPaymentDto: UpdateSellerPaymentDto) {
    return this.sellerPaymentsService.update(+id, updateSellerPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerPaymentsService.remove(+id);
  }
}
