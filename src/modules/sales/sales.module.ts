import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './sale.entity';
import { Product } from '../products/product.entity';
import { ProductAssignment } from '../product-assignments/product-assignment.entity';
import { UserRole } from '../user-roles/user-role.entity';

@Module({
  imports: [SequelizeModule.forFeature([Sale, Product, ProductAssignment, UserRole])],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
