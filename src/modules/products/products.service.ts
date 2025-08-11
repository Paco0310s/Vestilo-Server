import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.entity';
import { BaseService } from '../../common/services/base.service';
import { File } from '../files/file.entity';
import { ProductsImage } from '../products-images/products-image.entity';
import { InjectModel as InjectSequelizeModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { envs } from 'src/common/config/envs';

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(
    @InjectModel(Product)
    productModel: typeof Product,
    @InjectModel(File)
    private readonly fileModel?: typeof File,
    @InjectModel(ProductsImage)
    private readonly productsImageModel?: typeof ProductsImage,
  ) {
    super(productModel);
  }

  async attachImages(productId: number, images: any[]) {
    if (!images?.length || !this.fileModel || !this.productsImageModel) return;
    for (const img of images) {
      const fileRecord = await (this.fileModel as any).create({
        key: `products/${img.filename}`,
        name: img.originalname,
        extension: img.originalname.split('.').pop(),
        size: img.size,
        path: `/uploads/products/${img.filename}`,
        bucket: envs.url,
      });
      await (this.productsImageModel as any).create({
        product_id: productId,
        file_id: fileRecord.id,
      });
    }
  }
}
