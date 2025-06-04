import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TenancyModule } from 'src/tenancy/tenancy.module';

@Module({
  imports:[TenancyModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
