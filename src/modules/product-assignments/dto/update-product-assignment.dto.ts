import { PartialType } from '@nestjs/swagger';
import { CreateProductAssignmentDto } from './create-product-assignment.dto';

export class UpdateProductAssignmentDto extends PartialType(CreateProductAssignmentDto) {}
