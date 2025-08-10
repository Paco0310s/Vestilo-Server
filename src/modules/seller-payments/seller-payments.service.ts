import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SellerPayment } from './seller-payment.entity';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class SellerPaymentsService extends BaseService<SellerPayment> {
  constructor(
    @InjectModel(SellerPayment)
    private sellerPaymentModel: typeof SellerPayment,
  ) {
    super(sellerPaymentModel);
  }
}
