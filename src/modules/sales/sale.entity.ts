import { Column, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';

@Table({
  tableName: 'sales',
})
export class Sale extends BaseEntity {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
    field: 'product_id',
    allowNull: true, // Nullable para evitar errores
  })
  product_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'user_id',
    allowNull: true, // Nullable para evitar errores
  })
  user_id: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'sold_at',
  })
  sold_at: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
    field: 'sale_price',
  })
  sale_price: number;

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: true,
  })
  comision: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'comision_paid',
  })
  comision_paid: boolean;

  // Relaciones
  @BelongsTo(() => Product, { foreignKey: 'product_id', as: 'product' })
  product: Product;

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  user: User;
}
