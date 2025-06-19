import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase_order.service';
import { PurchaseOrderController } from './purchase_order.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';
import { PurchaseOrderDetailModule } from 'src/purchase_order_detail/purchase_order_detail.module';

@Module({
  imports:[TenancyModule, PurchaseOrderDetailModule],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
})
export class PurchaseOrderModule {}
