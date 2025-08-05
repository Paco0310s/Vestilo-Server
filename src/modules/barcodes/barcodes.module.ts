import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BarcodesService } from './barcodes.service';
import { BarcodesController } from './barcodes.controller';
import { Barcode } from './barcode.entity';

@Module({
  imports: [SequelizeModule.forFeature([Barcode])],
  controllers: [BarcodesController],
  providers: [BarcodesService],
})
export class BarcodesModule {}
