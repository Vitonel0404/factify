import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { join } from 'path';

ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
})

const configService = new ConfigService()

export const DataSourceConfig : DataSourceOptions = {
    type:'postgres',
    host: configService.get<string>("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    username: configService.get<string>("DB_USERNAME"),
    password: configService.get<string>("DB_PASSWORD"),
    database: configService.get<string>("DB_DATABASE"),
    entities: [
        join(__dirname, '../company/entities/**/*.{ts,js}'),
        join(__dirname, '../branch/entities/**/*.{ts,js}'),
        join(__dirname, '../plan/entities/**/*.{ts,js}'),
        join(__dirname, '../company_plan/entities/**/*.{ts,js}')

    ],
    migrations: [__dirname+"../../../db/migrations/*init{.ts,.js}"],
    synchronize: false,
    // logging: true
}

export const AppDS = new DataSource(DataSourceConfig);