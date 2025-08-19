import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unknown properties
      forbidNonWhitelisted: true, // true: throw error if unknown props, false: remove unknown props without throwing
      transform: true, // auto-transform payloads to DTO instances
    })
  );

  const config = new DocumentBuilder()
    .setTitle('ENG TRACKER API')
    .setDescription('API documentation for ENG TRACKER API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'refresh_token'
    ) // Optional: if you want JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc-api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
