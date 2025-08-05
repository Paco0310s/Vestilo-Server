import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductAssignmentsService } from './product-assignments.service';
import { ProductAssignmentsController } from './product-assignments.controller';
import { ProductAssignment } from './product-assignment.entity';

@Module({
  imports: [SequelizeModule.forFeature([ProductAssignment])],
  controllers: [ProductAssignmentsController],
  providers: [ProductAssignmentsService],
})
export class ProductAssignmentsModule {}
