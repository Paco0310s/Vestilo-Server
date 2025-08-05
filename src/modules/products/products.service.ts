import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.entity';
import { BaseService } from '../../common/services/base.service';

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(
    @InjectModel(Product)
    productModel: typeof Product,
  ) {
    super(productModel);
  }
}
