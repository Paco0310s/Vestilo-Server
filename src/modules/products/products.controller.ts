import { Controller } from '@nestjs/common';
import { ApiTags  } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { BaseController } from '../../common/controllers/base.controller';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController extends BaseController<Product, CreateProductDto, UpdateProductDto> {
  constructor(private readonly productsService: ProductsService) {
    super(productsService);
  }
}
