import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.entity';
import { BaseService } from '../../common/services/base.service';

@Injectable()
export class RolesService extends BaseService<Role> {
  constructor(
    @InjectModel(Role)
    roleModel: typeof Role,
  ) {
    super(roleModel);
  }
}
