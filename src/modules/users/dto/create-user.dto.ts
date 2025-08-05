import { IsEmail, IsOptional, IsString, MinLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan Pérez' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Teléfono del usuario', example: '+1234567890', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Email del usuario', example: 'juan@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Contraseña del usuario (mínimo 6 caracteres)', example: 'password123', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  // Campos de auditoría (opcionales, se establecen automáticamente)
  @ApiProperty({ description: 'ID del usuario que crea el registro', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  created_by?: number;

  @ApiProperty({ description: 'ID del usuario que actualiza el registro', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  updated_by?: number;
}
