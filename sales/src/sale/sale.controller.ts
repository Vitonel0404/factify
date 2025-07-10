import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { CompanyGuard } from 'src/middleware/company.guard';
import { Request } from 'express';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Req() req: Request, @Body() createSaleDto: CreateSaleDto) {
    const tenancy = Array.isArray(req.headers['x-tenant-id'])
    ? req.headers['x-tenant-id'][0]
    : req.headers['x-tenant-id'] || '';
    return this.saleService.create(createSaleDto,tenancy);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll(@Req() req: Request) {
    const branch = req.headers.branch as string;
    return this.saleService.findAll(+branch);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string, @Body() data: {user_name :string, reason: string, is_return : boolean}) {
    const tenancy = Array.isArray(req.headers['x-tenant-id'])
    ? req.headers['x-tenant-id'][0]
    : req.headers['x-tenant-id'] || '';
    return this.saleService.remove(+id, data, tenancy);
  }

  @UseGuards(CompanyGuard)
  @Post('forwarding/:id_sale')
  documentForwarding(@Req() req: Request, @Param('id_sale') id_sale: string, @Body() data: any) {
    const tenancy = Array.isArray(req.headers['x-tenant-id'])
    ? req.headers['x-tenant-id'][0]
    : req.headers['x-tenant-id'] || '';
    return this.saleService.documentForwarding(+id_sale,data,tenancy);
  }
}
