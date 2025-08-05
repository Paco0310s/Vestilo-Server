import { Column, Table, DataType } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';

@Table({
  tableName: 'sales',
})
export class Sale extends BaseEntity {
  @Column({
    type: DataType.BIGINT,
    field: 'product_id',
  })
  product_id: number;

  @Column({
    type: DataType.BIGINT,
    field: 'user_id',
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
}
