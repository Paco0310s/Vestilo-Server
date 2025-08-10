import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';

@Table({
  tableName: 'seller_payments',
})
export class SellerPayment extends BaseEntity {
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  declare user_id: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  declare amount: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare paid_at: Date;
}
