import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditNoteDetailDto } from './create-credit_note_detail.dto';

export class UpdateCreditNoteDetailDto extends PartialType(CreateCreditNoteDetailDto) {}
