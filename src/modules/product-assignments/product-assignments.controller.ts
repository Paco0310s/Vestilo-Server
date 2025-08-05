import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ProductAssignmentsService } from './product-assignments.service';
import { CreateProductAssignmentDto } from './dto/create-product-assignment.dto';
import { UpdateProductAssignmentDto } from './dto/update-product-assignment.dto';

@Controller('product-assignments')
export class ProductAssignmentsController {
  constructor(private readonly productAssignmentsService: ProductAssignmentsService) {}

  @Post()
  create(@Body(ValidationPipe) createProductAssignmentDto: CreateProductAssignmentDto) {
    return this.productAssignmentsService.create(createProductAssignmentDto);
  }

  @Get()
  findAll() {
    return this.productAssignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productAssignmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateProductAssignmentDto: UpdateProductAssignmentDto) {
    return this.productAssignmentsService.update(+id, updateProductAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productAssignmentsService.remove(+id);
  }
}
