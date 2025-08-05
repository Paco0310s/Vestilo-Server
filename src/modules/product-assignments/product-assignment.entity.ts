import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Table({
  tableName: 'product_assignments',
})
export class ProductAssignment extends BaseEntity {
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  user_id: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  product_id: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  assigned_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  completed_at: Date;

  // Relaciones
  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  user: User;

  @BelongsTo(() => Product, { foreignKey: 'product_id', as: 'product' })
  product: Product;
}
