import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SellerPayment } from './seller-payment.entity';
import { CreateSellerPaymentDto } from './dto/create-seller-payment.dto';
import { UpdateSellerPaymentDto } from './dto/update-seller-payment.dto';

@Injectable()
export class SellerPaymentsService {
  constructor(
    @InjectModel(SellerPayment)
    private sellerPaymentModel: typeof SellerPayment,
  ) {}

  async create(createSellerPaymentDto: CreateSellerPaymentDto): Promise<SellerPayment> {
    return this.sellerPaymentModel.create(createSellerPaymentDto as any);
  }

  async findAll(): Promise<SellerPayment[]> {
    return this.sellerPaymentModel.findAll();
  }

  async findOne(id: number): Promise<SellerPayment> {
    const sellerPayment = await this.sellerPaymentModel.findByPk(id);
    if (!sellerPayment) {
      throw new NotFoundException(`SellerPayment with ID ${id} not found`);
    }
    return sellerPayment;
  }

  async update(id: number, updateSellerPaymentDto: UpdateSellerPaymentDto): Promise<SellerPayment> {
    const sellerPayment = await this.findOne(id);
    await sellerPayment.update(updateSellerPaymentDto);
    return sellerPayment;
  }

  async remove(id: number): Promise<void> {
    const sellerPayment = await this.findOne(id);
    await sellerPayment.destroy();
  }
}
