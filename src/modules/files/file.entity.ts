import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'files',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class File extends Model<File> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  key: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  extension: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  size: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'blur_hash',
  })
  blur_hash: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  path: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bucket: string;

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
