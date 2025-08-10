import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { UserRole } from '../user-roles/user-role.entity';
import { Sale } from '../sales/sale.entity';
import { ProductAssignment } from '../product-assignments/product-assignment.entity';

@Table({
  tableName: 'users',
  timestamps: true, // Enable timestamps
  paranoid: true, // Enable soft delete
  deletedAt: 'deleted_at', // Specify the field for soft delete
  createdAt: 'created_at', // Specify the field for creation
  updatedAt: 'updated_at', // Specify the field for update
})
export class User extends BaseEntity {
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan Pérez' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({ description: 'Teléfono del usuario', example: '+1234567890', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare phone: string;

  @ApiProperty({ description: 'Email del usuario', example: 'juan@example.com', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  declare email?: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'password123', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare password: string;

  // Relations
  @ApiProperty({ description: 'Roles asignados al usuario', type: () => [UserRole], required: false })
  @HasMany(() => UserRole, { foreignKey: 'user_id', as: 'userRoles' })
  declare userRoles: UserRole[];

  @ApiProperty({ description: 'Ventas realizadas por el usuario', type: () => [Sale], required: false })
  @HasMany(() => Sale, { foreignKey: 'user_id', as: 'sales' })
  declare sales: Sale[];

  @ApiProperty({ description: 'Asignaciones de productos del usuario', type: () => [ProductAssignment], required: false })
  @HasMany(() => ProductAssignment, { foreignKey: 'user_id', as: 'productAssignments' })
  declare productAssignments: ProductAssignment[];
}
