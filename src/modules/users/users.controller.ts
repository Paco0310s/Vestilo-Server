import { Controller, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
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

  @Post()
  @ApiBody({ 
    type: CreateUserDto,
    description: 'Datos para crear un nuevo usuario'
  })
  create(@Body() createUserDto: CreateUserDto) {
    return super.create(createUserDto);
  }

  @Patch(':id')
  @ApiBody({ 
    type: UpdateUserDto,
    description: 'Datos para actualizar el usuario'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return super.update(id, updateUserDto);
  }
}
