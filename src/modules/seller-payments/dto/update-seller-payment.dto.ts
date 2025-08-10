import { PartialType } from '@nestjs/swagger';
import { CreateSellerPaymentDto } from './create-seller-payment.dto';

export class UpdateSellerPaymentDto extends PartialType(CreateSellerPaymentDto) {}
