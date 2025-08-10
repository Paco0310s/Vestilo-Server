import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class SalesService extends BaseService<Sale> {
  constructor(
    @InjectModel(Sale)
    private saleModel: typeof Sale,
  ) {
    super(saleModel);
  }
}
