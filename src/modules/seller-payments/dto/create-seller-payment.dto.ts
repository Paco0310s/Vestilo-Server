import { IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSellerPaymentDto {
  @ApiProperty({ description: 'ID del vendedor al que se realiza el pago', example: 3, required: false })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ description: 'Monto del pago realizado', example: 250.75, required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ description: 'Fecha y hora del pago', example: '2024-01-15T14:30:00Z', required: false })
  @IsOptional()
  @IsDateString()
  paid_at?: Date;
}
