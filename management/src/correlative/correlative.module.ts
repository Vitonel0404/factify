import { Module } from '@nestjs/common';
import { CorrelativeService } from './correlative.service';
import { CorrelativeController } from './correlative.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';

@Module({
  imports: [TenancyModule],
  controllers: [CorrelativeController],
  providers: [CorrelativeService],
})
export class CorrelativeModule {}
