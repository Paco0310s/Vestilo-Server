import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { ProductAssignment } from '../product-assignments/product-assignment.entity';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { BaseService } from 'src/common/services/base.service';
import { Product, ProductStatus } from '../products/product.entity';
import { ProductsImage } from '../products-images/products-image.entity';
import { UserRole } from '../user-roles/user-role.entity';
import { User } from '../users/user.entity';
import { File } from '../files/file.entity';

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

  // Obtener ventas de un usuario específico con detalles
  async findSalesByUser(userId: number, page: number = 1, limit: number = 20): Promise<any> {
    const offset = (page - 1) * limit;

    const sales = await this.saleModel.findAndCountAll({
      where: { user_id: userId },
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'description', 'color', 'size', 'purchase_price'],
          include: [
            {
              model: ProductsImage,
              as: 'images',
              attributes: ['id', 'file_id'],
              include: [
                {
                  model: File,
                  as: 'file',
                  attributes: ['id', 'path']
                }
              ],
              limit: 1 // Solo obtener la primera imagen
            }
          ]
        }
      ],
      order: [['sold_at', 'DESC']],
      limit,
      offset
    });

    return {
      data: sales.rows,
      pagination: {
        total: sales.count,
        page,
        limit,
        totalPages: Math.ceil(sales.count / limit)
      }
    };
  }

  // Debug: Obtener información detallada de comisiones de un usuario
  async debugUserCommissions(userId: number): Promise<any> {
    // 1. Obtener el rol actual del usuario con su comisión
    const userRole = await this.userRoleModel.findOne({ 
      where: { user_id: userId },
      order: [['created_at', 'DESC']] // Obtener el rol más reciente
    });

    // 2. Obtener algunas ventas del usuario con sus comisiones
    const sales = await this.saleModel.findAll({
      where: { user_id: userId },
      attributes: ['id', 'sale_price', 'comision', 'comision_paid', 'created_at'],
      limit: 10,
      order: [['created_at', 'DESC']]
    });

    return {
      userId,
      userRole: userRole ? {
        id: userRole.id,
        role_id: userRole.role_id,
        comission_percent: userRole.comission_percent,
        created_at: userRole.created_at
      } : null,
      recentSales: sales.map(sale => ({
        id: sale.id,
        sale_price: sale.sale_price,
        comision: sale.comision,
        comision_paid: sale.comision_paid,
        created_at: sale.created_at
      })),
      totalSales: sales.length,
      totalCommission: sales.reduce((sum, sale) => sum + (sale.comision || 0), 0)
    };
  }

  // Obtener estadísticas de ganancias de un usuario
  async getUserEarnings(userId: number, period: string = 'month'): Promise<any> {
    const now = new Date();
    let startDate: Date;

    // Determinar el período de consulta
    switch (period) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        const dayOfWeek = now.getDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startDate = new Date(now.getTime() - (daysToMonday * 24 * 60 * 60 * 1000));
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Obtener ventas del período
    const sales = await this.saleModel.findAll({
      where: {
        user_id: userId,
        sold_at: {
          [Op.gte]: startDate,
          [Op.lte]: now
        }
      },
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['name', 'purchase_price']
        }
      ]
    });

    // Calcular estadísticas
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + parseFloat(sale.sale_price as any) || 0, 0);
    const totalCommission = sales.reduce((sum, sale) => sum + parseFloat(sale.comision as any) || 0, 0);
    const averageSaleAmount = totalSales > 0 ? totalRevenue / totalSales : 0;

    // Calcular comisiones pendientes (todas las ventas del usuario, no solo del período)
    const allSalesForCommission = await this.saleModel.findAll({
      where: { 
        user_id: userId,
        comision_paid: false
      }
    });
    const pendingCommission = allSalesForCommission.reduce((sum, sale) => sum + parseFloat(sale.comision as any) || 0, 0);

    // Calcular ganancia bruta (precio de venta - precio de compra)
    const grossProfit = sales.reduce((sum, sale) => {
      const purchasePrice = parseFloat(sale.product?.purchase_price as any) || 0;
      const salePrice = parseFloat(sale.sale_price as any) || 0;
      return sum + (salePrice - purchasePrice);
    }, 0);

    // Estadísticas por método de pago
    const paymentMethodStats = sales.reduce((acc, sale) => {
      const method = sale.payment_method || 'unknown';
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, {});

    // Ventas por día (para gráficos)
    const salesByDay = sales.reduce((acc, sale) => {
      const date = sale.sold_at.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { count: 0, amount: 0 };
      }
      acc[date].count += 1;
      acc[date].amount += parseFloat(sale.sale_price as any) || 0;
      return acc;
    }, {});

    return {
      period,
      startDate,
      endDate: now,
      summary: {
        totalSales,
        totalRevenue,
        totalCommission,
        grossProfit,
        averageSaleAmount: parseFloat(averageSaleAmount.toFixed(2)),
        pendingCommission
      },
      paymentMethods: paymentMethodStats,
      salesByDay,
      recentSales: sales.slice(0, 5).map(sale => ({
        id: sale.id,
        productName: sale.product?.name,
        amount: parseFloat(sale.sale_price as any) || 0,
        commission: parseFloat(sale.comision as any) || 0,
        soldAt: sale.sold_at,
        paymentMethod: sale.payment_method
      }))
    };
  }
}
