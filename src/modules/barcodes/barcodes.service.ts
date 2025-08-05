import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Barcode } from './barcode.entity';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';

@Injectable()
export class BarcodesService {
  constructor(
    @InjectModel(Barcode)
    private barcodeModel: typeof Barcode,
  ) {}

  async create(createBarcodeDto: CreateBarcodeDto): Promise<Barcode> {
    return this.barcodeModel.create(createBarcodeDto as any);
  }

  async findAll(): Promise<Barcode[]> {
    return this.barcodeModel.findAll();
  }

  async findOne(id: number): Promise<Barcode> {
    const barcode = await this.barcodeModel.findByPk(id);
    if (!barcode) {
      throw new NotFoundException(`Barcode with ID ${id} not found`);
    }
    return barcode;
  }

  async update(id: number, updateBarcodeDto: UpdateBarcodeDto): Promise<Barcode> {
    const barcode = await this.findOne(id);
    await barcode.update(updateBarcodeDto);
    return barcode;
  }

  async remove(id: number): Promise<void> {
    const barcode = await this.findOne(id);
    await barcode.destroy();
  }
}
