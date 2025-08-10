import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, Req } from '@nestjs/common';
import { ProductAssignmentsService } from './product-assignments.service';
import { CreateProductAssignmentDto } from './dto/create-product-assignment.dto';
import { UpdateProductAssignmentDto } from './dto/update-product-assignment.dto';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { ProductAssignment } from './product-assignment.entity';
import { Request } from 'express';

@ApiTags('Product Assignments')
@ApiBearerAuth('JWT-auth')
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
  create(@Body() createProductAssignmentDto: CreateProductAssignmentDto, @Req() request: Request & { auditData?: any }) {
    return super.create(createProductAssignmentDto, request);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateProductAssignmentDto,
    description: 'Datos para actualizar la asignación del producto'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductAssignmentDto: UpdateProductAssignmentDto, @Req() request: Request & { auditData?: any }) {
    return super.update(id, updateProductAssignmentDto, request);
  }
}
