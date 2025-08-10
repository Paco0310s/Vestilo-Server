import { Controller } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { File } from './file.entity';

@ApiTags('Files')
@Controller('files')
export class FilesController extends BaseController<File> {
  constructor(private readonly filesService: FilesService) {
    super(filesService);
  }
}