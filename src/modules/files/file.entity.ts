import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';
import { ProductsImage } from '../products-images/products-image.entity';

@Table({
  tableName: 'files',
  timestamps: true, // Enable timestamps
  paranoid: true, // Enable soft delete
  deletedAt: 'deleted_at', // Specify the field for soft delete
  createdAt: 'created_at', // Specify the field for creation
  updatedAt: 'updated_at', // Specify the field for update
})
export class File extends BaseEntity {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare key: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare extension: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare size: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'blur_hash',
  })
  declare blur_hash: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare path: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare bucket: string;

  // Relations
  @HasMany(() => ProductsImage, { foreignKey: 'file_id', as: 'productImages' })
  declare productImages: ProductsImage[];
}
