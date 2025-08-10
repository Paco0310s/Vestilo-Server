import { Controller, Post, Body, Patch, Param, ParseIntPipe, ValidationPipe, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { BaseController } from '../../common/controllers/base.controller';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Request } from 'express';

@ApiTags('Roles')
@ApiBearerAuth('JWT-auth')
@Controller('roles')
export class RolesController extends BaseController<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(private readonly rolesService: RolesService) {
    super(rolesService);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ 
    type: CreateRoleDto,
    description: 'Datos para crear un nuevo rol'
  })
  create(@Body() createRoleDto: CreateRoleDto, @Req() request: Request & { auditData?: any }) {
    return super.create(createRoleDto, request);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateRoleDto,
    description: 'Datos para actualizar el rol'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto, @Req() request: Request & { auditData?: any }) {
    return super.update(id, updateRoleDto, request);
  }
}
