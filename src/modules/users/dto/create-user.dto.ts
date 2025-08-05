import { IsEmail, IsOptional, IsString, MinLength, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  // Campos de auditoría (opcionales, se establecen automáticamente)
  @IsOptional()
  @IsNumber()
  created_by?: number;

  @IsOptional()
  @IsNumber()
  updated_by?: number;
}
