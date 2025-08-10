import { Controller, Post, Body, Patch, Param, ParseIntPipe, Req } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { File } from './file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Request } from 'express';

@ApiTags('Files')
@ApiBearerAuth('JWT-auth')
@Controller('files')
export class FilesController extends BaseController<File, CreateFileDto, UpdateFileDto> {
  constructor(private readonly filesService: FilesService) {
    super(filesService);
  }

  @Post()
  @ApiBody({ 
    type: CreateFileDto,
    description: 'Datos para crear un nuevo archivo'
  })
  create(@Body() createFileDto: CreateFileDto, @Req() request: Request & { auditData?: any }) {
    return super.create(createFileDto, request);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateFileDto,
    description: 'Datos para actualizar el archivo'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFileDto: UpdateFileDto, @Req() request: Request & { auditData?: any }) {
    return super.update(id, updateFileDto, request);
  }
}