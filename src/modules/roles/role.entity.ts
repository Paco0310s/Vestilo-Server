import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { UserRole } from '../user-roles/user-role.entity';

@Table({
  tableName: 'roles',
  timestamps: true, // Enable timestamps
  paranoid: true, // Enable soft delete
  deletedAt: 'deleted_at', // Specify the field for soft delete
  createdAt: 'created_at', // Specify the field for creation
  updatedAt: 'updated_at', // Specify the field for update
})
export class Role extends BaseEntity {
  @ApiProperty({ description: 'Nombre del rol', example: 'Administrador' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  // Relations
  @ApiProperty({ description: 'Usuarios que tienen este rol', type: () => [UserRole], required: false })
  @HasMany(() => UserRole, { foreignKey: 'role_id', as: 'userRoles' })
  declare userRoles: UserRole[];
}
