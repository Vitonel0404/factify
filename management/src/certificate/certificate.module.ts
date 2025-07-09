import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';

@Module({
  imports:[TenancyModule],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificateModule {}
