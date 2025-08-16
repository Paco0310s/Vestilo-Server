import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ProductAssignment } from '../product-assignments/product-assignment.entity';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { BaseService } from 'src/common/services/base.service';
import { Product, ProductStatus } from '../products/product.entity';
import { UserRole } from '../user-roles/user-role.entity';

@Injectable()
export class SalesService extends BaseService<Sale> {
  constructor(
    @InjectModel(Sale) private saleModel: typeof Sale,
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(ProductAssignment) private productAssignmentModel: typeof ProductAssignment,
    @InjectModel(UserRole) private userRoleModel: typeof UserRole,
    private readonly sequelize: Sequelize,
  ) {
    super(saleModel);
  }

  // Override create para validar estado y marcar producto como vendido
  async create(createDto: CreateSaleDto, userId?: number): Promise<Sale> {
    const productId = createDto.product_id;
    if (!productId) {
      throw new BadRequestException('product_id es requerido');
    }
    if (!createDto.sale_price) {
      throw new BadRequestException('sale_price es requerido');
    }
    
    const product = await this.productModel.findByPk(productId);
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (product.status === ProductStatus.SOLD) {
      throw new BadRequestException('Producto ya fue vendido');
    }

    // Validar asignación al usuario (usar el userId del DTO como prioridad)
    const sellerId = createDto.user_id;
    if (!sellerId) {
      throw new BadRequestException('user_id es requerido');
    }
    
    const assignment = await this.productAssignmentModel.findOne({ 
      where: { product_id: productId, user_id: sellerId } 
    });
    if (!assignment) {
      throw new BadRequestException('Producto no asignado a este usuario');
    }

    // Obtener la comisión del usuario
    let comisionPercent = 0;
    const userRole = await this.userRoleModel.findOne({ 
      where: { user_id: sellerId },
      order: [['created_at', 'DESC']] // Obtener el rol más reciente
    });
    if (userRole && userRole.comission_percent) {
      comisionPercent = userRole.comission_percent;
    }

    // Calcular comisión
    const comisionAmount = createDto.comision || (createDto.sale_price * comisionPercent / 100);

    // Preparar datos para la venta
    const saleData = {
      product_id: createDto.product_id,
      user_id: createDto.user_id,
      sale_price: createDto.sale_price,
      sold_at: createDto.sold_at || new Date(), // Si no se proporciona, usar fecha actual
      comision: comisionAmount,
      comision_paid: createDto.comision_paid || false,
      payment_method: createDto.payment_method || 'cash',
      created_by: userId,
      updated_by: userId,
    };

    // Transacción: crear venta y actualizar estado del producto
    return await this.sequelize.transaction(async (t) => {
      const sale = await (this.saleModel as any).create(saleData, { transaction: t });
      await product.update({ status: ProductStatus.SOLD, updated_by: userId }, { transaction: t });
      return sale as Sale;
    });
  }
}
