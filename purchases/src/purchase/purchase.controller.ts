import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Request } from 'express';
import { CompanyGuard } from 'src/middleware/company.guard';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Req() req: Request, @Body() createPurchaseDto: CreatePurchaseDto) {
    const tenancy = Array.isArray(req.headers['x-tenant-id'])
    ? req.headers['x-tenant-id'][0]
    : req.headers['x-tenant-id'] || '';
    return this.purchaseService.create(createPurchaseDto, tenancy);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll(@Req() req: Request) {
    const branch = req.headers.branch as string;
    return this.purchaseService.findAll(+branch);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string, @Body() data: {user_name :string, reason: string, is_return : boolean}) {
    const tenancy = Array.isArray(req.headers['x-tenant-id'])
    ? req.headers['x-tenant-id'][0]
    : req.headers['x-tenant-id'] || '';
    return this.purchaseService.remove(+id, data, tenancy);
  }
}
