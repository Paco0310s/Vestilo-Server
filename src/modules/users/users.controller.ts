import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseController } from '../../common/controllers/base.controller';
import { User } from './user.entity';
import { Public, AdminOnly, CurrentUser } from '../auth/decorators';

@ApiTags('users')
@Controller('users')
export class UsersController extends BaseController<User> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @Post()
  @AdminOnly() // Solo administradores pueden crear usuarios
  @ApiOperation({ summary: 'Crear un nuevo usuario (Solo Administradores)' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: User })
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.usersService.create(createUserDto, currentUser.id);
  }

  @Patch(':id')
  @AdminOnly() // Solo administradores pueden actualizar usuarios
  @ApiOperation({ summary: 'Actualizar un usuario (Solo Administradores)' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente', type: User })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.usersService.update(id, updateUserDto, currentUser.id);
  }

  // Endpoint específico para buscar por email
  @Get('email/:email')
  @AdminOnly() // Solo administradores pueden buscar por email
  @ApiOperation({ summary: 'Buscar usuario por email (Solo Administradores)' })
  @ApiParam({ name: 'email', description: 'Email del usuario', type: 'string' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  // Endpoint para que cualquier usuario vea su propio perfil
  @Get('profile')
  @ApiOperation({ summary: 'Ver mi perfil (Usuario autenticado)' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario', type: User })
  getMyProfile(@CurrentUser() currentUser: any) {
    return this.usersService.findByIdWithRoles(currentUser.id);
  }

  // Sobrescribimos los métodos del BaseController para agregar seguridad de roles
  @Delete(':id')
  @AdminOnly() // Solo administradores pueden eliminar usuarios
  @ApiOperation({ summary: 'Eliminar un usuario (soft delete) - Solo Administradores' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente (soft delete)' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async removeUser(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: any,
  ) {
    return this.usersService.remove(id, currentUser.id);
  }

  @Patch(':id/restore')
  @AdminOnly() // Solo administradores pueden restaurar usuarios
  @ApiOperation({ summary: 'Restaurar un usuario eliminado - Solo Administradores' })
  @ApiParam({ name: 'id', description: 'ID del usuario a restaurar', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuario restaurado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async restoreUser(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: any,
  ) {
    return this.usersService.restore(id, currentUser.id);
  }
}
