import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { MeasureModule } from './measure/measure.module';
import { ProductModule } from './product/product.module';
import { TenancyModule } from './tenancy/tenancy.module';
import { ConfigModule } from '@nestjs/config';
import { ProductMovementModule } from './product_movement/product_movement.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
    isGlobal: true
  }),
    CategoryModule,
    MeasureModule,
    ProductModule,
    TenancyModule,
    ProductMovementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
