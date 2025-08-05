import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
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
  paranoid: true, // Habilita borrado lógico
})
export class Product extends BaseEntity {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  color: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  size: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  brand: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  category: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
    field: 'purchase_price',
  })
  purchase_price: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
    field: 'sale_price',
  })
  sale_price: number;

  @Column({
    type: DataType.ENUM(...Object.values(ProductStatus)),
    allowNull: false,
    defaultValue: ProductStatus.ACTIVE,
  })
  status: ProductStatus;

  // Relaciones
  @HasMany(() => Sale, { foreignKey: 'product_id', as: 'sales' })
  sales: Sale[];

  @HasMany(() => ProductAssignment, { foreignKey: 'product_id', as: 'productAssignments' })
  productAssignments: ProductAssignment[];

  @HasMany(() => ProductsImage, { foreignKey: 'product_id', as: 'images' })
  images: ProductsImage[];

  @HasMany(() => Barcode, { foreignKey: 'product_id', as: 'barcodes' })
  barcodes: Barcode[];
}
