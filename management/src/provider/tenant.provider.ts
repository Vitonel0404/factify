import { Scope, Provider, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Customer } from 'src/customer/entities/customer.entity';


export const TENANT_CONNECTION = 'TENANT_CONNECTION';

const dataSourceCache: Record<string, DataSource> = {};

export const TenantProvider: Provider = {
  provide: TENANT_CONNECTION,
  scope: Scope.REQUEST,
  inject: [REQUEST, ConfigService],
  useFactory: async (request: Request, configService: ConfigService) => {
    const tenant = request.headers['x-tenant-id'] as string;

    if (!tenant) {
      throw new NotFoundException('No tenant ID provided');
    }
    // if (!/^[a-zA-Z0-9_]+$/.test(tenant)) {
    //   throw new BadRequestException('Formato de tenant inválido');
    // }

    if (dataSourceCache[tenant]) {
      return dataSourceCache[tenant];
    }

    const options: DataSourceOptions = {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: tenant, // << aquí es donde cambia dinámicamente
      entities: [Customer], // O usa glob si prefieres
      synchronize: false,
    };
    const dataSource = new DataSource(options);
    try {
      await dataSource.initialize();
      dataSourceCache[tenant] = dataSource;
      return dataSource;
    } catch (error: any) {
      if (error.code === '3D000') {
        throw new NotFoundException(`La base de datos "${tenant}" no existe`);
      }
      console.error(`Error al conectar con la base de datos del tenant "${tenant}":`, error);
      throw new InternalServerErrorException('Error al conectar con la base de datos del tenant');
    }
  },
};
