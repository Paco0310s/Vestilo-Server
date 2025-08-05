import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'sales',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Sale extends Model<Sale> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

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
    type: DataType.BIGINT,
    allowNull: true,
    field: 'sold_at',
  })
  sold_at: number;

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

  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updated_at: Date;
}
