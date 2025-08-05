import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';

@Table({
  tableName: 'user_roles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class UserRole extends Model<UserRole> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

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

  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updated_at: Date;
}
