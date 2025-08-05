import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { BarcodeAssignmentsService } from './barcode-assignments.service';
import { CreateBarcodeAssignmentDto } from './dto/create-barcode-assignment.dto';
import { UpdateBarcodeAssignmentDto } from './dto/update-barcode-assignment.dto';

@Controller('barcode-assignments')
export class BarcodeAssignmentsController {
  constructor(private readonly barcodeAssignmentsService: BarcodeAssignmentsService) {}

  @Post()
  create(@Body(ValidationPipe) createBarcodeAssignmentDto: CreateBarcodeAssignmentDto) {
    return this.barcodeAssignmentsService.create(createBarcodeAssignmentDto);
  }

  @Get()
  findAll() {
    return this.barcodeAssignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barcodeAssignmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateBarcodeAssignmentDto: UpdateBarcodeAssignmentDto) {
    return this.barcodeAssignmentsService.update(+id, updateBarcodeAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barcodeAssignmentsService.remove(+id);
  }
}
