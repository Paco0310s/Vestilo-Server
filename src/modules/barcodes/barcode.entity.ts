import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';

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
}
