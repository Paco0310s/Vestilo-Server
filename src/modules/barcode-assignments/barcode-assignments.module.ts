import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BarcodeAssignmentsService } from './barcode-assignments.service';
import { BarcodeAssignmentsController } from './barcode-assignments.controller';
import { BarcodeAssignment } from './barcode-assignment.entity';

@Module({
  imports: [SequelizeModule.forFeature([BarcodeAssignment])],
  controllers: [BarcodeAssignmentsController],
  providers: [BarcodeAssignmentsService],
})
export class BarcodeAssignmentsModule {}
