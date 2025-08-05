import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'barcodes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Barcode extends Model<Barcode> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  format: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  assigned_at: Date;
}
