import { IsOptional, IsNumber } from 'class-validator';

export class CreateBarcodeAssignmentDto {
  @IsOptional()
  @IsNumber()
  barcode_id?: number;

  @IsOptional()
  @IsNumber()
  product_id?: number;
}
