import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale)
    private saleModel: typeof Sale,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.saleModel.create(createSaleDto as any);
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel.findAll();
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.saleModel.findByPk(id);
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const [affectedCount] = await this.saleModel.update(updateSaleDto, {
      where: { id },
    });
    if (affectedCount === 0) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const deletedCount = await this.saleModel.destroy({
      where: { id },
    });
    if (deletedCount === 0) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
  }
}
