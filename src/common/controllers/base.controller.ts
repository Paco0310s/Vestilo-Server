import { Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { BaseService } from '../services/base.service';
import { BaseEntity } from '../entities/base.entity';
import { AuditInterceptor } from '../interceptors/audit.interceptor';

@UseInterceptors(AuditInterceptor)
export abstract class BaseController<T extends BaseEntity> {
  constructor(protected readonly service: BaseService<T>) {}

  @Post()
  create(@Body() createDto: any) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query('include_deleted') includeDeleted?: string) {
    const include = includeDeleted === 'true';
    return this.service.findAll(include);
  }

  @Get('deleted')
  findDeleted() {
    return this.service.findDeleted();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('include_deleted') includeDeleted?: string
  ) {
    const include = includeDeleted === 'true';
    return this.service.findOne(id, include);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: any) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }

  @Delete(':id/force')
  forceDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.forceDelete(id);
  }
}
