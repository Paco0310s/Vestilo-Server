import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductAssignment } from './product-assignment.entity';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class ProductAssignmentsService extends BaseService<ProductAssignment> {
  constructor(
    @InjectModel(ProductAssignment)
    private productAssignmentModel: typeof ProductAssignment,
  ) {
    super(productAssignmentModel);
  }
}
