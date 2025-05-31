import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { join } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private configService: ConfigService,
  ) { }


  async create(createCompanyDto: CreateCompanyDto) {
    const dbName = `company_${createCompanyDto.legal_name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const dbHost = this.configService.get<string>('DB_HOST');
    const dbPort = this.configService.get<number>('DB_PORT');
    const dbUser = this.configService.get<string>('DB_USERNAME');
    const dbPass = this.configService.get<string>('DB_PASSWORD');
    const client = new Client({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPass,
      database: 'postgres',
    });

    try {
      await client.connect();
      await client.query(`CREATE DATABASE "${dbName}"`);
      await client.end();

      // Conectar a la nueva base de datos y sincronizar entidades
      const newDataSource = new DataSource({
        type: 'postgres',
        host: dbHost,
        port: dbPort,
        username: dbUser,
        password: dbPass,
        database: dbName,
        //entities: [join(__dirname, '../entities/**/*.entity.{ts,js}')],
        migrations: [join(__dirname, '../common/migrations/*migrations-tenant.{ts,js}')], //tener el archivo de migraciones para el tenant ya hecho. (name=migrations-tenant)
      });

      await newDataSource.initialize();
      await newDataSource.runMigrations();
      await newDataSource.destroy();

      // Guardar en tabla `companies` de la base principal
      const newCompany = this.companyRepository.create({...createCompanyDto,db_name:dbName});
      await this.companyRepository.save(newCompany);

      return { message: `Base de datos '${dbName}' creada y sincronizada`, dbName };
    } catch (err) {
      throw new InternalServerErrorException(`Error al crear la compañía: ${err.message}`);
    }
  }

  async findAll() {
    try {
      return await this.companyRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id_company: number) {
    try {
      return await this.companyRepository.findOne({ where: { id_company} });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id_company: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findOne({ where: { id_company } });

    if (!company) {
      throw new NotFoundException(`Company with id ${id_company} not found`);
    }

    const updated = Object.assign(company, updateCompanyDto);
    return await this.companyRepository.save(updated);
  }

  async remove(id_company: number) {
    const result = await this.companyRepository.update(
      { id_company },
      { is_active :  false }
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Company with id ${id_company} not found`);
    }

    return { message: 'Company remove successfully' };
  }
}
