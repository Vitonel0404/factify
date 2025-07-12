import { Module } from '@nestjs/common';
import { CreditNoteService } from './credit_note.service';
import { CreditNoteController } from './credit_note.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';
import { CreditNoteDetailModule } from 'src/credit_note_detail/credit_note_detail.module';

@Module({
  imports:[TenancyModule, CreditNoteDetailModule],
  controllers: [CreditNoteController],
  providers: [CreditNoteService],
})
export class CreditNoteModule {}
