import { IsEmail, IsString, MinLength } from 'class-validator';
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
    example: 'juan@vestilo.com' 
  })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  @ApiProperty({ 
    description: 'Contraseña del usuario', 
    example: 'password123',
    minLength: 6 
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({ 
    description: 'Teléfono del usuario', 
    example: '+1234567890',
    required: false 
  })
  @IsString()
  phone?: string;
}
