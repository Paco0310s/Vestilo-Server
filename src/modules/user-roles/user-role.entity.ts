import { Column, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';

@Table({
  tableName: 'user_roles',
})
export class UserRole extends BaseEntity {
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'user_id',
    allowNull: true, // Nullable para evitar errores
  })
  user_id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.BIGINT,
    field: 'role_id',
    allowNull: true, // Nullable para evitar errores
  })
  role_id: number;

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: true,
    field: 'comission_percent',
  })
  comission_percent: number;

  // Relaciones
  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  user: User;

  @BelongsTo(() => Role, { foreignKey: 'role_id', as: 'role' })
  role: Role;
}
