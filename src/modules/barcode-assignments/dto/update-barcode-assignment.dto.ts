import { PartialType } from '@nestjs/mapped-types';
import { CreateBarcodeAssignmentDto } from './create-barcode-assignment.dto';

export class UpdateBarcodeAssignmentDto extends PartialType(CreateBarcodeAssignmentDto) {}
