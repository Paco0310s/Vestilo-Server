import { Controller } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { UserRole } from './user-role.entity';

@ApiTags('User Roles')
@Controller('user-roles')
export class UserRolesController extends BaseController<UserRole> {
  constructor(private readonly userRolesService: UserRolesService) {
    super(userRolesService);
  }
}
