import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { Sale } from '../sales/sale.entity';
import { ProductAssignment } from '../product-assignments/product-assignment.entity';
import { ProductsImage } from '../products-images/products-image.entity';
import { Barcode } from '../barcodes/barcode.entity';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
}

@Table({
  tableName: 'products',
  timestamps: true, // Habilita timestamps
  paranoid: true, // Habilita borrado lógico
  deletedAt: 'deleted_at', // Especifica el campo para borrado lógico
  createdAt: 'created_at', // Especifica el campo de creación
  updatedAt: 'updated_at', // Especifica el campo de actualización
})
export class Product extends BaseEntity {
  @ApiProperty({ description: 'Nombre del producto', example: 'Camiseta Polo' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ description: 'Descripción del producto', example: 'Camiseta polo de algodón 100%', required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty({ description: 'Color del producto', example: 'Azul', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  color: string;

  @ApiProperty({ description: 'Talla del producto', example: 'M', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  size: string;

  @ApiProperty({ description: 'Marca del producto', example: 'Nike', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  brand: string;

  @ApiProperty({ description: 'Categoría del producto', example: 'Ropa deportiva', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  category: string;

  @ApiProperty({ description: 'Precio de compra', example: 25.50, required: false })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
    field: 'purchase_price',
  })
  purchase_price: number;

  @ApiProperty({ description: 'Precio de venta', example: 45.99, required: false })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
    field: 'sale_price',
  })
  sale_price: number;

  @ApiProperty({ 
    description: 'Estado del producto', 
    example: ProductStatus.ACTIVE,
    enum: ProductStatus,
    default: ProductStatus.ACTIVE 
  })
  @Column({
    type: DataType.ENUM(...Object.values(ProductStatus)),
    allowNull: false,
    defaultValue: ProductStatus.ACTIVE,
  })
  status: ProductStatus;

  // Relaciones
  @ApiProperty({ description: 'Ventas relacionadas con este producto', type: () => [Sale], required: false })
  @HasMany(() => Sale, { foreignKey: 'product_id', as: 'sales' })
  sales: Sale[];

  @ApiProperty({ description: 'Asignaciones del producto', type: () => [ProductAssignment], required: false })
  @HasMany(() => ProductAssignment, { foreignKey: 'product_id', as: 'productAssignments' })
  productAssignments: ProductAssignment[];

  @ApiProperty({ description: 'Imágenes del producto', type: () => [ProductsImage], required: false })
  @HasMany(() => ProductsImage, { foreignKey: 'product_id', as: 'images' })
  images: ProductsImage[];

  @ApiProperty({ description: 'Códigos de barras del producto', type: () => [Barcode], required: false })
  @HasMany(() => Barcode, { foreignKey: 'product_id', as: 'barcodes' })
  barcodes: Barcode[];
}
