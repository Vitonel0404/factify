import { Injectable } from '@nestjs/common';
import { CreateCompanyPlanDto } from './dto/create-company_plan.dto';
import { UpdateCompanyPlanDto } from './dto/update-company_plan.dto';

@Injectable()
export class CompanyPlanService {
  create(createCompanyPlanDto: CreateCompanyPlanDto) {
    return 'This action adds a new companyPlan';
  }

  findAll() {
    return `This action returns all companyPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyPlan`;
  }

  update(id: number, updateCompanyPlanDto: UpdateCompanyPlanDto) {
    return `This action updates a #${id} companyPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyPlan`;
  }
}
