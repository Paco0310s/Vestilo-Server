import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { UserRole } from '../user-roles/user-role.entity';
import { Sale } from '../sales/sale.entity';
import { ProductAssignment } from '../product-assignments/product-assignment.entity';

@Table({
  tableName: 'users',
  timestamps: true, // Habilita timestamps
  paranoid: true, // Habilita borrado lógico
  deletedAt: 'deleted_at', // Especifica el campo para borrado lógico
  createdAt: 'created_at', // Especifica el campo de creación
  updatedAt: 'updated_at', // Especifica el campo de actualización
})
export class User extends BaseEntity {
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan Pérez' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ description: 'Teléfono del usuario', example: '+1234567890', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @ApiProperty({ description: 'Email del usuario', example: 'juan@example.com', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'password123', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  // Relaciones
  @ApiProperty({ description: 'Roles asignados al usuario', type: () => [UserRole], required: false })
  @HasMany(() => UserRole, { foreignKey: 'user_id', as: 'userRoles' })
  userRoles: UserRole[];

  @ApiProperty({ description: 'Ventas realizadas por el usuario', type: () => [Sale], required: false })
  @HasMany(() => Sale, { foreignKey: 'user_id', as: 'sales' })
  sales: Sale[];

  @ApiProperty({ description: 'Asignaciones de productos del usuario', type: () => [ProductAssignment], required: false })
  @HasMany(() => ProductAssignment, { foreignKey: 'user_id', as: 'productAssignments' })
  productAssignments: ProductAssignment[];
}
