import { Controller, Post, Body, Patch, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { BaseController } from '../../common/controllers/base.controller';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController extends BaseController<Role> {
  constructor(private readonly rolesService: RolesService) {
    super(rolesService);
  }

  @Post()
  create(@Body(ValidationPipe) createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }
}
