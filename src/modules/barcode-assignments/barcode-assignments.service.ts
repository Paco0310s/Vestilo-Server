import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BarcodeAssignment } from './barcode-assignment.entity';
import { CreateBarcodeAssignmentDto } from './dto/create-barcode-assignment.dto';
import { UpdateBarcodeAssignmentDto } from './dto/update-barcode-assignment.dto';

@Injectable()
export class BarcodeAssignmentsService {
  constructor(
    @InjectModel(BarcodeAssignment)
    private barcodeAssignmentModel: typeof BarcodeAssignment,
  ) {}

  async create(createBarcodeAssignmentDto: CreateBarcodeAssignmentDto): Promise<BarcodeAssignment> {
    return this.barcodeAssignmentModel.create(createBarcodeAssignmentDto as any);
  }

  async findAll(): Promise<BarcodeAssignment[]> {
    return this.barcodeAssignmentModel.findAll();
  }

  async findOne(id: number): Promise<BarcodeAssignment> {
    const barcodeAssignment = await this.barcodeAssignmentModel.findByPk(id);
    if (!barcodeAssignment) {
      throw new NotFoundException(`BarcodeAssignment with ID ${id} not found`);
    }
    return barcodeAssignment;
  }

  async update(id: number, updateBarcodeAssignmentDto: UpdateBarcodeAssignmentDto): Promise<BarcodeAssignment> {
    const barcodeAssignment = await this.findOne(id);
    await barcodeAssignment.update(updateBarcodeAssignmentDto);
    return barcodeAssignment;
  }

  async remove(id: number): Promise<void> {
    const barcodeAssignment = await this.findOne(id);
    await barcodeAssignment.destroy();
  }
}
