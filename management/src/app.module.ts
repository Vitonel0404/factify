import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { TenancyModule } from './tenancy/tenancy.module';
import { DocumentTypeModule } from './document_type/document_type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    CustomerModule,
    TenancyModule,
    DocumentTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
