import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsImage } from './products-image.entity';
import { CreateProductsImageDto } from './dto/create-products-image.dto';
import { UpdateProductsImageDto } from './dto/update-products-image.dto';

@Injectable()
export class ProductsImagesService {
  constructor(
    @InjectModel(ProductsImage)
    private productsImageModel: typeof ProductsImage,
  ) {}

  async create(createProductsImageDto: CreateProductsImageDto): Promise<ProductsImage> {
    return this.productsImageModel.create(createProductsImageDto as any);
  }

  async findAll(): Promise<ProductsImage[]> {
    return this.productsImageModel.findAll();
  }

  async findOne(id: number): Promise<ProductsImage> {
    const productsImage = await this.productsImageModel.findByPk(id);
    if (!productsImage) {
      throw new NotFoundException(`ProductsImage with ID ${id} not found`);
    }
    return productsImage;
  }

  async update(id: number, updateProductsImageDto: UpdateProductsImageDto): Promise<ProductsImage> {
    const productsImage = await this.findOne(id);
    await productsImage.update(updateProductsImageDto);
    return productsImage;
  }

  async remove(id: number): Promise<void> {
    const productsImage = await this.findOne(id);
    await productsImage.destroy();
  }
}
