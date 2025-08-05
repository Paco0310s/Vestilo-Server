import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity extends Model {
  @ApiProperty({ description: 'Identificador único del registro', example: 1 })
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    comment: 'Identificador único del registro',
  })
  declare id: number;

  @ApiProperty({ description: 'Fecha y hora de creación del registro', example: '2024-01-01T10:00:00Z' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    comment: 'Fecha y hora de creación del registro',
  })
  created_at: Date;

  @ApiProperty({ description: 'Fecha y hora de última actualización del registro', example: '2024-01-01T10:00:00Z' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updated_at: Date;

  @ApiProperty({ description: 'Fecha y hora de eliminación lógica del registro', example: null, required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
    comment: 'Fecha y hora de eliminación lógica del registro',
  })
  deleted_at: Date;

  @ApiProperty({ description: 'ID del usuario que creó el registro', example: 1, required: false })
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    comment: 'ID del usuario que creó el registro',
  })
  created_by: number;

  @ApiProperty({ description: 'ID del usuario que actualizó el registro', example: 1, required: false })
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    comment: 'ID del usuario que actualizó el registro',
  })
  updated_by: number;

  @ApiProperty({ description: 'ID del usuario que eliminó el registro', example: 1, required: false })
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    comment: 'ID del usuario que eliminó el registro',
  })
  deleted_by: number;
}
