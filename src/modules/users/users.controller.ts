import { Controller,} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { BaseController } from '../../common/controllers/base.controller';
import { User } from './user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController extends BaseController<User> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }
}
