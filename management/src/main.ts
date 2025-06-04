import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Elimina propiedades no declaradas en el DTO
      forbidNonWhitelisted: true, // (opcional) lanza error si llega una propiedad no esperada
      transform: true,        // Transforma el payload a la instancia del DTO
    }),
  );

  await app.listen(+configService.get('PORT'));
  console.log("Service running on port",configService.get('PORT') );
}
bootstrap();
