import { Module } from '@nestjs/common';
import { VoucherTypeService } from './voucher_type.service';
import { VoucherTypeController } from './voucher_type.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';

@Module({
  imports: [TenancyModule],
  controllers: [VoucherTypeController],
  providers: [VoucherTypeService],
})
export class VoucherTypeModule {}
