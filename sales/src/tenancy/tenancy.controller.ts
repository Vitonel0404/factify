import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TenancyService } from './tenancy.service';
import { CreateTenancyDto } from './dto/create-tenancy.dto';
import { UpdateTenancyDto } from './dto/update-tenancy.dto';

@Controller('tenancy')
export class TenancyController {
  constructor(private readonly tenancyService: TenancyService) {}

}
