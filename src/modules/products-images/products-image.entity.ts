import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';

@Table({
  tableName: 'products_images',
})
export class ProductsImage extends BaseEntity {
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  product_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  file_id: number;
}
