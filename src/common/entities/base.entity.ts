import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

export abstract class BaseEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    comment: 'Identificador único del registro',
  })
  declare id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    comment: 'Fecha y hora de creación del registro',
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updated_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
    comment: 'Fecha y hora de eliminación lógica del registro',
  })
  deleted_at: Date;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    comment: 'ID del usuario que creó el registro',
  })
  created_by: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    comment: 'ID del usuario que actualizó el registro',
  })
  updated_by: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    comment: 'ID del usuario que eliminó el registro',
  })
  deleted_by: number;
}
