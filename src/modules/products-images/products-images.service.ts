import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsImage } from './products-image.entity';
import { CreateProductsImageDto } from './dto/create-products-image.dto';
import { UpdateProductsImageDto } from './dto/update-products-image.dto';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class ProductsImagesService extends BaseService<ProductsImage> {
  constructor(
    @InjectModel(ProductsImage)
    private productsImageModel: typeof ProductsImage,
  ) {
    super(productsImageModel);
  }
}
