import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CompanyGuard } from "../middleware/company.guard";



@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  
  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @UseGuards(CompanyGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @UseGuards(CompanyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
