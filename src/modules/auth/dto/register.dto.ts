import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ 
    description: 'Nombre completo del usuario', 
    example: 'Juan Pérez' 
  })
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'Email del usuario', 
    example: 'juan@vestilo.com', 
    required: false
  })
  @IsOptional()
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email?: string;

  @ApiProperty({ 
    description: 'Teléfono del usuario', 
    example: '1234567890',
  })
  @IsString()
  phone: string;

  @ApiProperty({ 
    description: 'Contraseña del usuario', 
    example: 'password123',
    minLength: 8 
  })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;
}
