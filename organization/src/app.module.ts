import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { CompanyModule } from './company/company.module';
import { BranchModule } from './branch/branch.module';
import { PlanModule } from './plan/plan.module';
import { CompanyPlanModule } from './company_plan/company_plan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    CompanyModule,
    BranchModule,
    PlanModule,
    CompanyPlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
