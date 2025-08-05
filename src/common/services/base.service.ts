import { Injectable, NotFoundException } from '@nestjs/common';
import type { ModelStatic } from 'sequelize-typescript';
import { BaseEntity } from '../entities/base.entity';
import { Op } from 'sequelize';

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  constructor(protected readonly model: ModelStatic<T>) {}

  async create(createDto: any, userId?: number): Promise<T> {
    const data = {
      ...createDto,
      created_by: userId,
      updated_by: userId,
    };
    return await (this.model as any).create(data);
  }

  async findAll(includeDeleted = false): Promise<T[]> {
    const whereClause = includeDeleted ? {} : { deletedAt: { [Op.is]: null } };
    
    return await (this.model as any).findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number, includeDeleted = false): Promise<T> {
    const whereClause = includeDeleted 
      ? { id } 
      : { id, deletedAt: { [Op.is]: null } };

    const entity = await (this.model as any).findOne({
      where: whereClause,
    });

    if (!entity) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }

    return entity;
  }

  async update(id: number, updateDto: any, userId?: number): Promise<T> {
    const entity = await this.findOne(id);
    
    const data = {
      ...updateDto,
      updated_by: userId,
    };

    await entity.update(data);
    return entity;
  }

  async remove(id: number, userId?: number): Promise<T> {
    const entity = await this.findOne(id);
    
    // Borrado lógico
    await entity.update({
      deletedAt: new Date(),
      deleted_by: userId,
    });

    return entity;
  }

  async restore(id: number, userId?: number): Promise<T> {
    const entity = await this.findOne(id, true); // Incluir borrados
    
    if (!entity.deletedAt) {
      throw new NotFoundException(`El registro con ID ${id} no está eliminado`);
    }

    await entity.update({
      deletedAt: null,
      deleted_by: null,
      updated_by: userId,
    });

    return entity;
  }

  async forceDelete(id: number): Promise<void> {
    const entity = await this.findOne(id, true); // Incluir borrados
    await entity.destroy();
  }

  async findDeleted(): Promise<T[]> {
    return await (this.model as any).findAll({
      where: {
        deletedAt: { [Op.not]: null },
      },
      order: [['deletedAt', 'DESC']],
    });
  }
}
