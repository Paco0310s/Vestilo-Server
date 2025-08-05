import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductsImageDto {
  @IsOptional()
  @IsNumber()
  product_id?: number;

  @IsOptional()
  @IsNumber()
  file_id?: number;
}
