import { Module } from '@nestjs/common';
import { CreditNoteDetailService } from './credit_note_detail.service';
import { CreditNoteDetailController } from './credit_note_detail.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';

@Module({
  imports:[TenancyModule],
  controllers: [CreditNoteDetailController],
  providers: [CreditNoteDetailService],
  exports: [CreditNoteDetailService]
})
export class CreditNoteDetailModule {}
