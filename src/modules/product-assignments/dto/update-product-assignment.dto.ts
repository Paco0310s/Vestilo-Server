import { PartialType } from '@nestjs/mapped-types';
import { CreateProductAssignmentDto } from './create-product-assignment.dto';

export class UpdateProductAssignmentDto extends PartialType(CreateProductAssignmentDto) {}
