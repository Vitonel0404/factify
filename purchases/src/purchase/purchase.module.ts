import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';
import { PurchaseDetailModule } from 'src/purchase_detail/purchase_detail.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[TenancyModule, PurchaseDetailModule, HttpModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
