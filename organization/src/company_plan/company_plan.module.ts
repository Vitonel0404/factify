import { Module } from '@nestjs/common';
import { CompanyPlanService } from './company_plan.service';
import { CompanyPlanController } from './company_plan.controller';

@Module({
  controllers: [CompanyPlanController],
  providers: [CompanyPlanService],
})
export class CompanyPlanModule {}
