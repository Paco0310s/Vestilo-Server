import { Controller, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { UserRole } from './user-role.entity';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

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
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return super.create(createUserRoleDto);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateUserRoleDto,
    description: 'Datos para actualizar la asignación de rol'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return super.update(id, updateUserRoleDto);
  }
}
