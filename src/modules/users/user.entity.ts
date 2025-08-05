import { Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { BaseEntity } from '../../common/entities/base.entity';
import { UserRole } from '../user-roles/user-role.entity';
import { Sale } from '../sales/sale.entity';
import { ProductAssignment } from '../product-assignments/product-assignment.entity';

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

  // Relaciones
  @HasMany(() => UserRole, { foreignKey: 'user_id', as: 'userRoles' })
  userRoles: UserRole[];

  @HasMany(() => Sale, { foreignKey: 'user_id', as: 'sales' })
  sales: Sale[];

  @HasMany(() => ProductAssignment, { foreignKey: 'user_id', as: 'productAssignments' })
  productAssignments: ProductAssignment[];
}
