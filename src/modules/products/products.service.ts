import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product, ProductStatus } from './product.entity';
import { BaseService } from '../../common/services/base.service';
import { File } from '../files/file.entity';
import { ProductsImage } from '../products-images/products-image.entity';
import { ProductAssignment } from '../product-assignments/product-assignment.entity';
import { InjectModel as InjectSequelizeModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { envs } from 'src/common/config/envs';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(
    @InjectModel(Product)
    productModel: typeof Product,
    @InjectModel(File)
    private readonly fileModel?: typeof File,
    @InjectModel(ProductsImage)
    private readonly productsImageModel?: typeof ProductsImage,
    @InjectModel(ProductAssignment)
    private readonly productAssignmentModel?: typeof ProductAssignment,
  ) {
    super(productModel);
  }

  // Sobrescribir findAll para incluir imágenes
  async findAll(includeDeleted = false): Promise<Product[]> {
    const whereClause = includeDeleted ? {} : { deleted_at: { [Op.is]: null } };
    
    return await (this.model as any).findAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: ProductsImage,
          as: 'images',
          required: false, // LEFT JOIN para que traiga productos sin imágenes también
          include: [
            {
              model: File,
              as: 'file',
              attributes: ['path'], // Solo necesitamos el path para la URL
            }
          ]
        }
      ]
    });
  }

  // Sobrescribir findOne para incluir imágenes también
  async findOne(id: number, includeDeleted = false): Promise<Product> {
    const whereClause = includeDeleted 
      ? { id } 
      : { id, deleted_at: { [Op.is]: null } };

    const entity = await (this.model as any).findOne({
      where: whereClause,
      include: [
        {
          model: ProductsImage,
          as: 'images',
          required: false,
          include: [
            {
              model: File,
              as: 'file',
              attributes: ['path'],
            }
          ]
        }
      ]
    });

    if (!entity) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }

    return entity;
  }

  // Método para findAll con filtros adicionales
  async findAllWithFilters(
    includeDeleted = false, 
    status?: ProductStatus, 
    search?: string, 
    page = 1, 
    limit = 20
  ): Promise<Product[]> {
    const whereClause: any = includeDeleted ? {} : { deleted_at: { [Op.is]: null } };
    
    // Filtro por status
    if (status) {
      whereClause.status = status;
    }
    
    // Filtro por búsqueda (nombre o descripción)
    if (search && search.trim()) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search.trim()}%` } },
        { description: { [Op.like]: `%${search.trim()}%` } }
      ];
    }
    
    const offset = (page - 1) * limit;
    
    const results = await (this.model as any).findAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      limit: limit,
      offset: offset,
      include: [
        {
          model: ProductsImage,
          as: 'images',
          required: false,
          include: [
            {
              model: File,
              as: 'file',
              attributes: ['path'],
            }
          ]
        }
      ]
    });
    
    return results;
  }

  // Método específico para obtener productos asignados a un usuario
  async findAssignedToUser(userId: number, page = 1, limit = 20): Promise<Product[]> {
    const offset = (page - 1) * limit;
    
    const results = await (this.model as any).findAll({
      where: {
        deleted_at: { [Op.is]: null },
        // Solo productos que no estén vendidos
        status: { [Op.ne]: ProductStatus.SOLD }
      },
      order: [['created_at', 'DESC']],
      limit: limit,
      offset: offset,
      include: [
        {
          model: ProductsImage,
          as: 'images',
          required: false,
          include: [
            {
              model: File,
              as: 'file',
              attributes: ['path'],
            }
          ]
        },
        {
          model: ProductAssignment,
          as: 'productAssignments',
          required: true, // INNER JOIN - solo productos que tengan asignación
          where: {
            user_id: userId,
            return_at: { [Op.is]: null }, // Solo asignaciones activas (no devueltas)
            deleted_at: { [Op.is]: null }
          }
        }
      ]
    });
    
    return results;
  }

  async attachImages(productId: number, images: any[]) {
    if (!images?.length || !this.fileModel || !this.productsImageModel) return;
    for (const img of images) {
      const fileRecord = await (this.fileModel as any).create({
        key: `products/${img.filename}`,
        name: img.originalname,
        extension: img.originalname.split('.').pop(),
        size: img.size,
        path: `/uploads/products/${img.filename}`,
        bucket: envs.url,
      });
      await (this.productsImageModel as any).create({
        product_id: productId,
        file_id: fileRecord.id,
      });
    }
  }

  async findStatusesByIds(ids: number[]) {
    if (!ids?.length) return [];
    const products = await (this.model as any).findAll({
      attributes: ['id', 'status'],
      where: { id: { [Op.in]: ids } },
    });
    return products.map((p: any) => ({ id: p.id, status: p.status }));
  }
}
