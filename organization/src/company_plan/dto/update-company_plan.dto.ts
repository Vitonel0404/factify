import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyPlanDto } from './create-company_plan.dto';

export class UpdateCompanyPlanDto extends PartialType(CreateCompanyPlanDto) {}
