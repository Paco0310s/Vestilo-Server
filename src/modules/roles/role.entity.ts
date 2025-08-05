import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';
import { UserRole } from '../user-roles/user-role.entity';

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

  // Relaciones
  @HasMany(() => UserRole, { foreignKey: 'role_id', as: 'userRoles' })
  userRoles: UserRole[];
}
