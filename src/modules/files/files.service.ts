import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File)
    private fileModel: typeof File,
  ) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    return this.fileModel.create(createFileDto as any);
  }

  async findAll(): Promise<File[]> {
    return this.fileModel.findAll();
  }

  async findOne(id: number): Promise<File> {
    const file = await this.fileModel.findByPk(id);
    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return file;
  }

  async update(id: number, updateFileDto: UpdateFileDto): Promise<File> {
    const [affectedCount] = await this.fileModel.update(updateFileDto, {
      where: { id },
    });
    if (affectedCount === 0) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const deletedCount = await this.fileModel.destroy({
      where: { id },
    });
    if (deletedCount === 0) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
  }
}
