import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';
import { ProductsImage } from '../products-images/products-image.entity';

@Table({
  tableName: 'files',
  paranoid: true, // Habilita borrado lógico
})
export class File extends BaseEntity {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  key: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  extension: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  size: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'blur_hash',
  })
  blur_hash: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  path: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bucket: string;

  // Relaciones
  @HasMany(() => ProductsImage, { foreignKey: 'file_id', as: 'productImages' })
  productImages: ProductsImage[];
}
