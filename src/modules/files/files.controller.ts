import { Controller, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { File } from './file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@ApiTags('Files')
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
  create(@Body() createFileDto: CreateFileDto) {
    return super.create(createFileDto);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateFileDto,
    description: 'Datos para actualizar el archivo'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFileDto: UpdateFileDto) {
    return super.update(id, updateFileDto);
  }
}