import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'product_assignments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class ProductAssignment extends Model<ProductAssignment> {
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
    type: DataType.BIGINT,
    allowNull: true,
  })
  product_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  assigned_at: Date;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  completed_at: Date;
}
