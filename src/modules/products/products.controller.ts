import { Controller } from '@nestjs/common';
import { ApiTags  } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { BaseController } from '../../common/controllers/base.controller';
import { Product } from './product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController extends BaseController<Product> {
  constructor(private readonly productsService: ProductsService) {
    super(productsService);
  }
}
