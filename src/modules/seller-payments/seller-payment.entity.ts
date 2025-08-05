import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'seller_payments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class SellerPayment extends Model<SellerPayment> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  declare id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  user_id: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  amount: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  paid_at: Date;
}
