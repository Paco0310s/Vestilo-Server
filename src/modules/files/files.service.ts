import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './file.entity';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class FilesService extends BaseService<File> {
  constructor(
    @InjectModel(File)
    fileModel: typeof File,
  ) {
    super(fileModel);
  }
}

