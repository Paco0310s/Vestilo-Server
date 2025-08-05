import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SellerPaymentsService } from './seller-payments.service';
import { SellerPaymentsController } from './seller-payments.controller';
import { SellerPayment } from './seller-payment.entity';

@Module({
  imports: [SequelizeModule.forFeature([SellerPayment])],
  controllers: [SellerPaymentsController],
  providers: [SellerPaymentsService],
})
export class SellerPaymentsModule {}
