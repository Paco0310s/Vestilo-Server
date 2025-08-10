import { Column, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';

@Table({
  tableName: 'sales',
  timestamps: true, // Enable timestamps
  paranoid: true, // Enable soft delete
  deletedAt: 'deleted_at', // Specify the field for soft delete
  createdAt: 'created_at', // Specify the field for creation
  updatedAt: 'updated_at', // Specify the field for update
})
export class Sale extends BaseEntity {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
    field: 'product_id',
    allowNull: true, // Nullable para evitar errores
  })
  declare product_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'user_id',
    allowNull: true, // Nullable para evitar errores
  })
  declare user_id: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'sold_at',
  })
  declare sold_at: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
    field: 'sale_price',
  })
  declare sale_price: number;

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: true,
  })
  declare comision: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'comision_paid',
  })
  declare comision_paid: boolean;

  // Relations
  @BelongsTo(() => Product, { foreignKey: 'product_id', as: 'product' })
  declare product: Product;

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  declare user: User;
}
