import { Column, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';

@Table({
  tableName: 'user_roles',
  timestamps: true, // Enable timestamps
  paranoid: true, // Enable soft delete
  deletedAt: 'deleted_at', // Specify the field for soft delete
  createdAt: 'created_at', // Specify the field for creation
  updatedAt: 'updated_at', // Specify the field for update
})
export class UserRole extends BaseEntity {
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'user_id',
    allowNull: true, 
  })
  declare user_id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.BIGINT,
    field: 'role_id',
    allowNull: true, 
  })
  declare role_id: number;

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: true,
    field: 'comission_percent',
  })
  declare comission_percent: number;

  // Relations
  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  declare user: User;

  @BelongsTo(() => Role, { foreignKey: 'role_id', as: 'role' })
  declare role: Role;
}
