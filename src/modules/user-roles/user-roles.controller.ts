import { Controller, Post, Body, Patch, Param, ParseIntPipe, Req } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { UserRole } from './user-role.entity';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Request } from 'express';

@ApiTags('User Roles')
@Controller('user-roles')
export class UserRolesController extends BaseController<UserRole, CreateUserRoleDto, UpdateUserRoleDto> {
  constructor(private readonly userRolesService: UserRolesService) {
    super(userRolesService);
  }

  @Post()
  @ApiBody({ 
    type: CreateUserRoleDto,
    description: 'Datos para asignar un rol a un usuario'
  })
  create(@Body() createUserRoleDto: CreateUserRoleDto, @Req() request: Request & { auditData?: any }) {
    return super.create(createUserRoleDto, request);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateUserRoleDto,
    description: 'Datos para actualizar la asignación de rol'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserRoleDto: UpdateUserRoleDto, @Req() request: Request & { auditData?: any }) {
    return super.update(id, updateUserRoleDto, request);
  }
}
