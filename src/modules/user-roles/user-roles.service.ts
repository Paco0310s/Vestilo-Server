import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from './user-role.entity';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import e from 'express';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class UserRolesService extends BaseService<UserRole> {
  constructor(
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
  ) {
    super(userRoleModel);
  }
}
