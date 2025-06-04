import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { TenancyModule } from './tenancy/tenancy.module';
import { DocumentTypeModule } from './document_type/document_type.module';
import { VoucherTypeModule } from './voucher_type/voucher_type.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { SupplierModule } from './supplier/supplier.module';
import { CorrelativeModule } from './correlative/correlative.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    CustomerModule,
    TenancyModule,
    DocumentTypeModule,
    VoucherTypeModule,
    PaymentMethodModule,
    SupplierModule,
    CorrelativeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
