import { IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductAssignmentDto {
  @ApiProperty({ description: 'ID del usuario asignado', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ description: 'ID del producto asignado', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  product_id?: number;

  @ApiProperty({ description: 'Fecha de asignación', example: '2024-01-01T10:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  assigned_at?: Date;

  @ApiProperty({ description: 'Fecha de retorno', example: '2024-01-15T10:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  return_at?: Date;
}
