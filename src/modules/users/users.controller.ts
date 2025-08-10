import { Controller,} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { BaseController } from '../../common/controllers/base.controller';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController extends BaseController<User, CreateUserDto, UpdateUserDto> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }
}
