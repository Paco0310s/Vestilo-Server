import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { Sale } from '../sales/sale.entity';
import { ProductAssignment } from '../product-assignments/product-assignment.entity';
import { ProductsImage } from '../products-images/products-image.entity';

export enum ProductStatus {
  IN_STOCK = 'in_stock',
  ASSIGNED = 'assigned',
  SOLD = 'sold',
  RETURNED = 'returned',
}

@Table({
  tableName: 'products',
  timestamps: true, // Enable timestamps
  paranoid: true, // Enable soft delete
  deletedAt: 'deleted_at', // Specify the field for soft delete
  createdAt: 'created_at', // Specify the field for creation
  updatedAt: 'updated_at', // Specify the field for update
})
export class Product extends BaseEntity {
  @ApiProperty({ description: 'Nombre del producto', example: 'Camiseta Polo' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({ description: 'Descripción del producto', example: 'Camiseta polo de algodón 100%', required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @ApiProperty({ description: 'Color del producto', example: 'Azul', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare color: string;

  @ApiProperty({ description: 'Talla del producto', example: 'M', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare size: string;

  @ApiProperty({ description: 'Precio de compra', example: 25.50, required: false })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
    field: 'purchase_price',
  })
  declare purchase_price: number;

  @ApiProperty({ description: 'Precio de venta', example: 45.99, required: false })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
    field: 'sale_price',
  })
  declare sale_price: number;

  @ApiProperty({ 
    description: 'Estado del producto', 
    example: ProductStatus.IN_STOCK,
    enum: ProductStatus,
    default: ProductStatus.IN_STOCK
  })
  @Column({
    type: DataType.ENUM(...Object.values(ProductStatus)),
    allowNull: false,
    defaultValue: ProductStatus.IN_STOCK,
  })
  declare status: ProductStatus;

  // Relations
  @ApiProperty({ description: 'Ventas relacionadas con este producto', type: () => [Sale], required: false })
  @HasMany(() => Sale, { foreignKey: 'product_id', as: 'sales' })
  declare sales: Sale[];

  @ApiProperty({ description: 'Asignaciones del producto', type: () => [ProductAssignment], required: false })
  @HasMany(() => ProductAssignment, { foreignKey: 'product_id', as: 'productAssignments' })
  declare productAssignments: ProductAssignment[];

  @ApiProperty({ description: 'Imágenes del producto', type: () => [ProductsImage], required: false })
  @HasMany(() => ProductsImage, { foreignKey: 'product_id', as: 'images' })
  declare images: ProductsImage[];
}
