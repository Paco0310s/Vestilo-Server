import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from './user-role.entity';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    return this.userRoleModel.create(createUserRoleDto as any);
  }

  async findAll(): Promise<UserRole[]> {
    return this.userRoleModel.findAll();
  }

  async findOne(id: number): Promise<UserRole> {
    const userRole = await this.userRoleModel.findByPk(id);
    if (!userRole) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }
    return userRole;
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole> {
    const [affectedCount] = await this.userRoleModel.update(updateUserRoleDto, {
      where: { id },
    });
    if (affectedCount === 0) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const deletedCount = await this.userRoleModel.destroy({
      where: { id },
    });
    if (deletedCount === 0) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }
  }
}
