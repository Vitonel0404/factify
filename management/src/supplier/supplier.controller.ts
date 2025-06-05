import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CompanyGuard } from 'src/middleware/company.guard';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(+id);
  }

  @UseGuards(CompanyGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.supplierService.update(+id, updateSupplierDto);
  }

  @UseGuards(CompanyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }
}
