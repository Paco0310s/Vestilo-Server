import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';

@Table({
  tableName: 'product_assignments',
})
export class ProductAssignment extends BaseEntity {
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
