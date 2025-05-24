import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyPlanService } from './company_plan.service';
import { CreateCompanyPlanDto } from './dto/create-company_plan.dto';
import { UpdateCompanyPlanDto } from './dto/update-company_plan.dto';

@Controller('company-plan')
export class CompanyPlanController {
  constructor(private readonly companyPlanService: CompanyPlanService) {}

  @Post()
  create(@Body() createCompanyPlanDto: CreateCompanyPlanDto) {
    return this.companyPlanService.create(createCompanyPlanDto);
  }

  @Get()
  findAll() {
    return this.companyPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyPlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyPlanDto: UpdateCompanyPlanDto) {
    return this.companyPlanService.update(+id, updateCompanyPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyPlanService.remove(+id);
  }
}
