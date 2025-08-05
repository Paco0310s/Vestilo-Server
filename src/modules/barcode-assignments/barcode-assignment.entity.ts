import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';

@Table({
  tableName: 'barcode_assignments',
})
export class BarcodeAssignment extends BaseEntity {
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
