import { Column, Table, DataType } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';

@Table({
  tableName: 'roles',
  paranoid: true, // Habilita borrado lógico
})
export class Role extends BaseEntity {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
