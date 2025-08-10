import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ProductAssignmentsService } from './product-assignments.service';
import { CreateProductAssignmentDto } from './dto/create-product-assignment.dto';
import { UpdateProductAssignmentDto } from './dto/update-product-assignment.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { ProductAssignment } from './product-assignment.entity';

@ApiTags('Product Assignments')
@Controller('product-assignments')
export class ProductAssignmentsController extends BaseController<ProductAssignment, CreateProductAssignmentDto, UpdateProductAssignmentDto> {
  constructor(private readonly productAssignmentsService: ProductAssignmentsService) {
    super(productAssignmentsService);
  }

  @Post()
  @ApiBody({ 
    type: CreateProductAssignmentDto,
    description: 'Datos para asignar un producto a un usuario'
  })
  create(@Body() createProductAssignmentDto: CreateProductAssignmentDto) {
    return super.create(createProductAssignmentDto);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateProductAssignmentDto,
    description: 'Datos para actualizar la asignación del producto'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductAssignmentDto: UpdateProductAssignmentDto) {
    return super.update(id, updateProductAssignmentDto);
  }
}
