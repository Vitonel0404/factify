import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TenancyModule } from './tenancy/tenancy.module';
import { PurchaseModule } from './purchase/purchase.module';
import { PurchaseDetailModule } from './purchase_detail/purchase_detail.module';
import { PurchaseOrderModule } from './purchase_order/purchase_order.module';
import { PurchaseOrderDetailModule } from './purchase_order_detail/purchase_order_detail.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
    isGlobal: true
  }), TenancyModule, PurchaseModule, PurchaseDetailModule, PurchaseOrderModule, PurchaseOrderDetailModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
