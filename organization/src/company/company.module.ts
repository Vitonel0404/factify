import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Branch } from 'src/branch/entities/branch.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Company, Branch])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
