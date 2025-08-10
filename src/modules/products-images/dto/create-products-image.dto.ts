import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductsImageDto {
  @ApiProperty({ description: 'ID del producto al que se asocia la imagen', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  product_id?: number;

  @ApiProperty({ description: 'ID del archivo de imagen', example: 5, required: false })
  @IsOptional()
  @IsNumber()
  file_id?: number;
}
