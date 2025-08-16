import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductAssignment } from './product-assignment.entity';
import { BaseService } from 'src/common/services/base.service';
import { CreateProductAssignmentDto } from './dto/create-product-assignment.dto';

@Injectable()
export class ProductAssignmentsService extends BaseService<ProductAssignment> {
  constructor(
    @InjectModel(ProductAssignment)
    private productAssignmentModel: typeof ProductAssignment,
  ) {
    super(productAssignmentModel);
  }

  // Override create para manejar assigned_at automáticamente
  async create(createDto: CreateProductAssignmentDto, userId?: number): Promise<ProductAssignment> {
    const data = {
      user_id: createDto.user_id,
      product_id: createDto.product_id,
      // Si no se proporciona assigned_at, usar la fecha actual
      assigned_at: createDto.assigned_at || new Date(),
      return_at: createDto.return_at || null,
      created_by: userId,
      updated_by: userId,
    };
    return await (this.productAssignmentModel as any).create(data);
  }
}
