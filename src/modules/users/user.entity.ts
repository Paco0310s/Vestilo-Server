import { Column, Table, DataType } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';

@Table({
  tableName: 'users',
  paranoid: true, // Habilita borrado lógico
})
export class User extends BaseEntity {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;
}
