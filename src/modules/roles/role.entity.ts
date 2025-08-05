import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { UserRole } from '../user-roles/user-role.entity';

@Table({
  tableName: 'roles',
  timestamps: true, // Habilita timestamps
  paranoid: true, // Habilita borrado lógico
  deletedAt: 'deleted_at', // Especifica el campo para borrado lógico
  createdAt: 'created_at', // Especifica el campo de creación
  updatedAt: 'updated_at', // Especifica el campo de actualización
})
export class Role extends BaseEntity {
  @ApiProperty({ description: 'Nombre del rol', example: 'Administrador' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  // Relaciones
  @ApiProperty({ description: 'Usuarios que tienen este rol', type: () => [UserRole], required: false })
  @HasMany(() => UserRole, { foreignKey: 'role_id', as: 'userRoles' })
  userRoles: UserRole[];
}
