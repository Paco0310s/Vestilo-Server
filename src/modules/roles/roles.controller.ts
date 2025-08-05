import { Controller, Post, Body, Patch, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { BaseController } from '../../common/controllers/base.controller';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('roles')
@Public() // Temporalmente público
@Controller('roles')
export class RolesController extends BaseController<Role> {
  constructor(private readonly rolesService: RolesService) {
    super(rolesService);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo rol' })
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente', type: Role })
  create(@Body(ValidationPipe) createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un rol' })
  @ApiParam({ name: 'id', description: 'ID del rol', type: 'number' })
  @ApiResponse({ status: 200, description: 'Rol actualizado exitosamente', type: Role })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }
}
