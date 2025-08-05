import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductAssignment } from './product-assignment.entity';
import { CreateProductAssignmentDto } from './dto/create-product-assignment.dto';
import { UpdateProductAssignmentDto } from './dto/update-product-assignment.dto';

@Injectable()
export class ProductAssignmentsService {
  constructor(
    @InjectModel(ProductAssignment)
    private productAssignmentModel: typeof ProductAssignment,
  ) {}

  async create(createProductAssignmentDto: CreateProductAssignmentDto): Promise<ProductAssignment> {
    return this.productAssignmentModel.create(createProductAssignmentDto as any);
  }

  async findAll(): Promise<ProductAssignment[]> {
    return this.productAssignmentModel.findAll();
  }

  async findOne(id: number): Promise<ProductAssignment> {
    const productAssignment = await this.productAssignmentModel.findByPk(id);
    if (!productAssignment) {
      throw new NotFoundException(`ProductAssignment with ID ${id} not found`);
    }
    return productAssignment;
  }

  async update(id: number, updateProductAssignmentDto: UpdateProductAssignmentDto): Promise<ProductAssignment> {
    const productAssignment = await this.findOne(id);
    await productAssignment.update(updateProductAssignmentDto);
    return productAssignment;
  }

  async remove(id: number): Promise<void> {
    const productAssignment = await this.findOne(id);
    await productAssignment.destroy();
  }
}
