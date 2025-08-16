import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { AuthResponse } from './dto/auth.response.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(emailOrPhone: string, password: string): Promise<User | null> {
    try {

      const user = await this.usersService.findByEmailOrPhone(emailOrPhone);
      const coincidePassword = await bcrypt.compare(password, user.password);

      if (coincidePassword) return user;

      return null;
    } catch (error) {
      return null;
    }
  }

  async login(loginDto: LoginDto) : Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.emailOrPhone, loginDto.password);

    if (!user) throw new BadRequestException('Credenciales inválidas');
    
    const userWithRoles = await this.usersService.findByIdWithRoles(user.id);
    
    const roles = userWithRoles?.userRoles?.map(ur => ur.role?.name) || [];

    const payload = { 
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      roles: roles
    };

    const response = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      roles: roles,
      token: this.jwtService.sign(payload),
    };

    return response;
  }

  async register(registerDto: RegisterDto) : Promise<AuthResponse> {
    if (registerDto.email) {
      const existingUserByEmail = await this.usersService.findByEmailOrNull(registerDto.email);
      if (existingUserByEmail) throw new BadRequestException('Ya existe un usuario con ese email');
    }

    const existingUserByPhone = await this.usersService.findByPhoneOrNull(registerDto.phone);
    if (existingUserByPhone) throw new BadRequestException('Ya existe un usuario con ese teléfono');

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    const userWithRoles = await this.usersService.findByIdWithRoles(user.id);
    const roles = userWithRoles?.userRoles?.map(ur => ur.role?.name) || [];

    const payload = { 
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      roles: roles
    };

    const response = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      roles: roles,
      token: this.jwtService.sign(payload),
    };

    return response;
  }

  async getProfile(userId: number) : Promise<AuthResponse> {
    const user = await this.usersService.findByIdWithRoles(userId);

    const roles = user.userRoles?.map(ur => ur.role?.name) || [];

    const payload = { 
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      roles: roles
    };

    const response = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      roles: roles,
      token: this.jwtService.sign(payload),
    };

    return response;
  }
}
