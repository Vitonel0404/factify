import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    private companyRepo: Repository<Company>,
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
        entities: [join(__dirname, '../entities/**/*.entity.{ts,js}')],
        migrations: [join(__dirname, '../../db/migrations/*migrations-tenant.{ts,js}')], //tener el archivo de migraciones para el tenant ya hecho. (name=migrations-tenant)
      });

      await newDataSource.initialize();
      await newDataSource.runMigrations();
      await newDataSource.destroy();

      // Guardar en tabla `companies` de la base principal
      const newCompany = this.companyRepo.create({...createCompanyDto,db_name:dbName});
      await this.companyRepo.save(newCompany);

      return { message: `Base de datos '${dbName}' creada y sincronizada`, dbName };
    } catch (err) {
      throw new InternalServerErrorException(`Error al crear la compañía: ${err.message}`);
    }
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
