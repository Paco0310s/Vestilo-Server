import { Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { BaseService } from '../services/base.service';
import { BaseEntity } from '../entities/base.entity';
import { AuditInterceptor } from '../interceptors/audit.interceptor';

@UseInterceptors(AuditInterceptor)
@ApiBearerAuth()
export abstract class BaseController<T extends BaseEntity> {
  constructor(protected readonly service: BaseService<T>) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro' })
  @ApiResponse({ status: 201, description: 'Registro creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createDto: any) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros' })
  @ApiQuery({ 
    name: 'include_deleted', 
    required: false, 
    description: 'Incluir registros eliminados (soft delete)',
    type: 'string',
    enum: ['true', 'false']
  })
  @ApiResponse({ status: 200, description: 'Lista de registros obtenida exitosamente' })
  findAll(@Query('include_deleted') includeDeleted?: string) {
    const include = includeDeleted === 'true';
    return this.service.findAll(include);
  }

  @Get('deleted')
  @ApiOperation({ summary: 'Obtener solo los registros eliminados (soft delete)' })
  @ApiResponse({ status: 200, description: 'Lista de registros eliminados obtenida exitosamente' })
  findDeleted() {
    return this.service.findDeleted();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro', type: 'number' })
  @ApiQuery({ 
    name: 'include_deleted', 
    required: false, 
    description: 'Incluir si está eliminado (soft delete)',
    type: 'string',
    enum: ['true', 'false']
  })
  @ApiResponse({ status: 200, description: 'Registro encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('include_deleted') includeDeleted?: string
  ) {
    const include = includeDeleted === 'true';
    return this.service.findOne(id, include);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un registro por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro a actualizar', type: 'number' })
  @ApiResponse({ status: 200, description: 'Registro actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: any) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un registro (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del registro a eliminar', type: 'number' })
  @ApiResponse({ status: 200, description: 'Registro eliminado exitosamente (soft delete)' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaurar un registro eliminado (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del registro a restaurar', type: 'number' })
  @ApiResponse({ status: 200, description: 'Registro restaurado exitosamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }

  @Delete(':id/force')
  @ApiOperation({ summary: 'Eliminar permanentemente un registro' })
  @ApiParam({ name: 'id', description: 'ID del registro a eliminar permanentemente', type: 'number' })
  @ApiResponse({ status: 200, description: 'Registro eliminado permanentemente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  forceDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.forceDelete(id);
  }
}
