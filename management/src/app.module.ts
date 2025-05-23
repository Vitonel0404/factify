import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { TenancyModule } from './tenancy/tenancy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    // TypeOrmModule.forRoot({...DataSourceConfig}),
    CustomerModule,
    TenancyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
