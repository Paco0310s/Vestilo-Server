import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ProductAssignmentsService } from './product-assignments.service';
import { CreateProductAssignmentDto } from './dto/create-product-assignment.dto';
import { UpdateProductAssignmentDto } from './dto/update-product-assignment.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { ProductAssignment } from './product-assignment.entity';

@ApiTags('Product Assignments')
@Controller('product-assignments')
export class ProductAssignmentsController extends BaseController<ProductAssignment, CreateProductAssignmentDto, UpdateProductAssignmentDto> {
  constructor(private readonly productAssignmentsService: ProductAssignmentsService) {
    super(productAssignmentsService);
  }
}
