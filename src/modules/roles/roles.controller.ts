import { Controller, Post, Body, Patch, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { BaseController } from '../../common/controllers/base.controller';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController extends BaseController<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(private readonly rolesService: RolesService) {
    super(rolesService);
  }
}
