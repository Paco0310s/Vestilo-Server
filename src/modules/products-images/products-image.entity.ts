import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from '../products/product.entity';
import { File } from '../files/file.entity';

@Table({
  tableName: 'products_images',
  timestamps: true, // Enable timestamps
  paranoid: true, // Enable soft delete
  deletedAt: 'deleted_at', // Specify the field for soft delete
  createdAt: 'created_at', // Specify the field for creation
  updatedAt: 'updated_at', // Specify the field for update
})
export class ProductsImage extends BaseEntity {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  declare product_id: number;

  @ForeignKey(() => File)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  declare file_id: number;

  // Relations
  @BelongsTo(() => Product, { foreignKey: 'product_id', as: 'product' })
  declare product: Product;

  @BelongsTo(() => File, { foreignKey: 'file_id', as: 'file' })
  declare file: File;
}
