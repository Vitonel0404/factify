import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditNoteDto } from './create-credit_note.dto';

export class UpdateCreditNoteDto extends PartialType(CreateCreditNoteDto) {}
