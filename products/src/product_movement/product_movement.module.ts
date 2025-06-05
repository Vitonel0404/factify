import { Module } from '@nestjs/common';
import { ProductMovementService } from './product_movement.service';
import { ProductMovementController } from './product_movement.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';

@Module({
  imports:[TenancyModule],
  controllers: [ProductMovementController],
  providers: [ProductMovementService],
})
export class ProductMovementModule {}
