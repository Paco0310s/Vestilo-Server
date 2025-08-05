import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from '../products/product.entity';
import { File } from '../files/file.entity';

@Table({
  tableName: 'products_images',
})
export class ProductsImage extends BaseEntity {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  product_id: number;

  @ForeignKey(() => File)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  file_id: number;

  // Relaciones
  @BelongsTo(() => Product, { foreignKey: 'product_id', as: 'product' })
  product: Product;

  @BelongsTo(() => File, { foreignKey: 'file_id', as: 'file' })
  file: File;
}
