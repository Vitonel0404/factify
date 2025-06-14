import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductMovementService } from './product_movement.service';
import { CreateProductMovementsDto } from './dto/create-product_movement.dto';
import { CompanyGuard } from 'src/middleware/company.guard';
import { Request } from 'express';

@Controller('product-movement')
export class ProductMovementController {
  constructor(private readonly productMovementService: ProductMovementService) { }

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createProductMovementDto: CreateProductMovementsDto) {
    return this.productMovementService.createMovements(createProductMovementDto.movements);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll(@Req() req: Request) {
    const branch = req.headers.branch as string;
    return this.productMovementService.findAll(+branch);
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productMovementService.findOne(+id);
  }

}
