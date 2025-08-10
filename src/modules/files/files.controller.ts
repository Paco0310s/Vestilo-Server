import { Controller } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';
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
}