import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'], // o especifica dominios como ['http://localhost:4200']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const configService = app.get(ConfigService);

  await app.listen(+configService.get('PORT'),'0.0.0.0');
  console.log("Service running on port",configService.get('PORT') );
}
bootstrap();
