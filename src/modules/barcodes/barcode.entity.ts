import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from '../products/product.entity';

@Table({
  tableName: 'barcodes',
  paranoid: true, // Habilita borrado lógico
})
export class Barcode extends BaseEntity {
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
    type: DataType.DATE,
    allowNull: true,
  })
  assigned_at: Date;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    field: 'product_id',
  })
  product_id: number;

  // Relaciones
  @BelongsTo(() => Product, { foreignKey: 'product_id', as: 'product' })
  product: Product;
}
