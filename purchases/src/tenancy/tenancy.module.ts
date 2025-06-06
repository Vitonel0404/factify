import { Module } from '@nestjs/common';
import { TenancyService } from './tenancy.service';
import { TenancyController } from './tenancy.controller';
import { TenantProvider } from 'src/provider/tenant.provider';

@Module({
  controllers: [TenancyController],
  providers: [TenancyService, TenantProvider],
  exports: [TenantProvider]
})
export class TenancyModule {}
