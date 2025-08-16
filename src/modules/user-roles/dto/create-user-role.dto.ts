import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @ApiProperty({ description: 'ID del usuario al que se asigna el rol', example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'ID del rol que se asigna al usuario', example: 2 })
  @IsNumber()
  role_id: number;

  @ApiProperty({ description: 'Porcentaje de comisión para este rol (0-100)', example: 15.5, required: false })
  @IsOptional()
  @IsNumber()
  comission_percent?: number;
}
