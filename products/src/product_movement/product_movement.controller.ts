import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductMovementService } from './product_movement.service';
import { CreateProductMovementDto } from './dto/create-product_movement.dto';
import { UpdateProductMovementDto } from './dto/update-product_movement.dto';
import { CompanyGuard } from 'src/middleware/company.guard';

@Controller('product-movement')
export class ProductMovementController {
  constructor(private readonly productMovementService: ProductMovementService) {}

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createProductMovementDto: CreateProductMovementDto) {
    return this.productMovementService.create(createProductMovementDto);
  }

}
