import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";


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
    // host: "192.168.50.21",
    // port: 5432,
    // username: "EVillacrez",
    // password: "Janekrio9",
    // database: "test",
    entities: [__dirname + '../../**/*.entity{.ts,.js}'],
    migrations: [__dirname+"../../../db/migrations/*{.ts,.js}"],
    synchronize: false,
    // logging: true
}

export const AppDS = new DataSource(DataSourceConfig);