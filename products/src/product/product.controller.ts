import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CompanyGuard } from 'src/middleware/company.guard';
import { DiscountProductsDto } from './dto/discount-products';
import { IncreaseProductsDto } from './dto/increase-products';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @UseGuards(CompanyGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(CompanyGuard)
  @Get()
  findAll(@Req() req: Request) {
    const branch = req.headers.branch as string;
    return this.productService.findAll(+branch);
  }

  @UseGuards(CompanyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(CompanyGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(CompanyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @UseGuards(CompanyGuard)
  @Post('discount')
  unitDiscount(@Body() discountProductsDto: DiscountProductsDto) {
    return this.productService.discountProducts(discountProductsDto.products);
  }

  @UseGuards(CompanyGuard)
  @Post('increase')
  unitIncrease(@Body() increaseProductsDto: IncreaseProductsDto) {
    return this.productService.increaseProducts(increaseProductsDto.products);
  }
}
