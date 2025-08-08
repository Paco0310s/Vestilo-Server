import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    description: 'Email o teléfono del usuario', 
    example: '3921224927' 
  })
  @IsString({ message: 'Debe ser un texto válido' })
  emailOrPhone: string; // Mantenemos el nombre 'email' por compatibilidad, pero ahora acepta email o teléfono

  @ApiProperty({ 
    description: 'Contraseña del usuario', 
    example: '12345678',
    minLength: 8 
  })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;
}
