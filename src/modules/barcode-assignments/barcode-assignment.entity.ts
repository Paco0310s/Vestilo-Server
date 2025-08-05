import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'barcode_assignments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class BarcodeAssignment extends Model<BarcodeAssignment> {
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
  barcode_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  product_id: number;
}
