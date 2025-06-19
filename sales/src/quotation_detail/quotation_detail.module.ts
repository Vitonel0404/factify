import { Module } from '@nestjs/common';
import { QuotationDetailService } from './quotation_detail.service';
import { QuotationDetailController } from './quotation_detail.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';

@Module({
  imports:[TenancyModule],
  controllers: [QuotationDetailController],
  providers: [QuotationDetailService],
  exports: [QuotationDetailService]
})
export class QuotationDetailModule {}
