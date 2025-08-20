import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductAssignment } from './product-assignment.entity';
import { BaseService } from 'src/common/services/base.service';
import { CreateProductAssignmentDto } from './dto/create-product-assignment.dto';
import { Product } from '../products/product.entity';
import { ProductsImage } from '../products-images/products-image.entity';
import { File } from '../files/file.entity';
import { User } from '../users/user.entity';
import { UserRole } from '../user-roles/user-role.entity';
import { Role } from '../roles/role.entity';
import { Op } from 'sequelize';
import { envs } from 'src/common/config/envs';

@Injectable()
export class ProductAssignmentsService extends BaseService<ProductAssignment> {
  constructor(
    @InjectModel(ProductAssignment)
    private productAssignmentModel: typeof ProductAssignment,
  ) {
    super(productAssignmentModel);
  }

  // Override create para manejar assigned_at automáticamente
  async create(createDto: CreateProductAssignmentDto, userId?: number): Promise<ProductAssignment> {
    const data = {
      user_id: createDto.user_id,
      product_id: createDto.product_id,
      // Si no se proporciona assigned_at, usar la fecha actual
      assigned_at: createDto.assigned_at || new Date(),
      return_at: createDto.return_at || null,
      created_by: userId,
      updated_by: userId,
    };
    return await (this.productAssignmentModel as any).create(data);
  }

  // Obtener productos asignados a un vendedor específico
  async getSellerProducts(sellerId: number, search?: string): Promise<any[]> {
    const whereCondition: any = {
      user_id: sellerId,
      return_at: null, // Solo productos que no han sido devueltos
    };

    const productWhereCondition: any = {};
    if (search) {
      productWhereCondition[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { color: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const assignments = await this.productAssignmentModel.findAll({
      where: whereCondition,
      include: [
        {
          model: Product,
          as: 'product',
          where: productWhereCondition,
          include: [
            {
              model: ProductsImage,
              as: 'images',
              limit: 1, // Solo la primera imagen
              include: [
                {
                  model: File,
                  as: 'file',
                  attributes: ['path'],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          include: [
            {
              model: UserRole,
              as: 'userRoles',
              include: [
                {
                  model: Role,
                  as: 'role',
                  // Remover el where para traer todos los roles, luego filtraremos en el código
                },
              ],
            },
          ],
        },
      ],
      order: [['assigned_at', 'DESC']],
    });

    // Transformar los datos para incluir la información de comisión
    return assignments.map((assignment) => {
      const product = assignment.product;
      const user = assignment.user;
      
      // Debug: log para ver qué roles tiene el usuario
      console.log('User roles:', user?.userRoles?.map(ur => ({ roleName: ur.role?.name, commission: ur.comission_percent })));
      
      const sellerRole = user?.userRoles?.find(ur => ur.role?.name === 'Vendedor'); // Buscar rol 'Vendedor'
      console.log('Seller role found:', sellerRole);
      
      const commission = sellerRole?.comission_percent ? parseFloat(sellerRole.comission_percent.toString()) : 0;
      const salePrice = parseFloat(product.sale_price.toString());
      const commissionAmount = salePrice * (commission / 100);
      
    // Construir URL de imagen
    const filePath = product.images && product.images.length > 0 && product.images[0].file 
      ? product.images[0].file.path 
      : null;
    
    console.log('File path before URL construction:', filePath);
    
    // Remover diagonal inicial si existe para evitar doble diagonal
    const cleanPath = filePath ? (filePath.startsWith('/') ? filePath.substring(1) : filePath) : null;
    const imageUrl = cleanPath ? `${envs.url}/${cleanPath}` : null;

    console.log('Commission calculation:', { commission, salePrice, commissionAmount, imageUrl });      return {
        id: product.id,
        name: product.name,
        description: product.description,
        color: product.color,
        size: product.size,
        sale_price: salePrice,
        status: product.status,
        images: product.images,
        image_url: imageUrl,
        commission: commission,
        commission_amount: commissionAmount,
        product_assignment: {
          id: assignment.id,
          assigned_at: assignment.assigned_at,
        },
      };
    });
  }

  // Obtener detalles de un producto específico para un vendedor
  async getSellerProductDetails(sellerId: number, productId: number): Promise<any> {
    const assignment = await this.productAssignmentModel.findOne({
      where: {
        user_id: sellerId,
        product_id: productId,
        return_at: null,
      },
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: ProductsImage,
              as: 'images',
              include: [
                {
                  model: File,
                  as: 'file',
                  attributes: ['path'],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          include: [
            {
              model: UserRole,
              as: 'userRoles',
              include: [
                {
                  model: Role,
                  as: 'role',
                  // Remover el where para traer todos los roles
                },
              ],
            },
          ],
        },
      ],
    });

    if (!assignment) {
      throw new Error('Producto no encontrado o no asignado a este vendedor');
    }

    const product = assignment.product;
    const user = assignment.user;
    
    // Debug: log para ver qué roles tiene el usuario
    console.log('User roles for details:', user?.userRoles?.map(ur => ({ roleName: ur.role?.name, commission: ur.comission_percent })));
    
    const sellerRole = user?.userRoles?.find(ur => ur.role?.name === 'Vendedor'); // Buscar rol 'Vendedor'
    console.log('Seller role found for details:', sellerRole);
    
    const commission = sellerRole?.comission_percent ? parseFloat(sellerRole.comission_percent.toString()) : 0;
    const salePrice = parseFloat(product.sale_price.toString());
    const commissionAmount = salePrice * (commission / 100);
    
    // Construir URL de imagen
    const filePath = product.images && product.images.length > 0 && product.images[0].file 
      ? product.images[0].file.path 
      : null;
    
    console.log('File path before URL construction for details:', filePath);
    
    // Remover diagonal inicial si existe para evitar doble diagonal
    const cleanPath = filePath ? (filePath.startsWith('/') ? filePath.substring(1) : filePath) : null;
    const imageUrl = cleanPath ? `${envs.url}/${cleanPath}` : null;

    console.log('Commission calculation for details:', { commission, salePrice, commissionAmount, imageUrl });

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      color: product.color,
      size: product.size,
      sale_price: salePrice,
      status: product.status,
      images: product.images,
      image_url: imageUrl,
      commission: commission,
      commission_amount: commissionAmount,
      product_assignment: {
        id: assignment.id,
        assigned_at: assignment.assigned_at,
      },
    };
  }
}
