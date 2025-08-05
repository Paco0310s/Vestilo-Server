import { Column, Table, DataType } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';

@Table({
  tableName: 'user_roles',
})
export class UserRole extends BaseEntity {
  @Column({
    type: DataType.BIGINT,
    field: 'user_id',
  })
  user_id: number;

  @Column({
    type: DataType.BIGINT,
    field: 'role_id',
  })
  role_id: number;

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: true,
    field: 'comission_percent',
  })
  comission_percent: number;
}
