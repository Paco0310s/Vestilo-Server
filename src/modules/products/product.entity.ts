import { Column, Table, DataType } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';

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
}
