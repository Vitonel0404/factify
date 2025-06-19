import { PartialType } from '@nestjs/mapped-types';
import { CreateQuotationDetailDto } from './create-quotation_detail.dto';

export class UpdateQuotationDetailDto extends PartialType(CreateQuotationDetailDto) {}
