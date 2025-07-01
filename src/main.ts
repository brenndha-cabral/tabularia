import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 3000);

  process.env.TZ = config.get<string>('TIMEZONE');

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tabulária API')
    .setDescription(
      '📘 API para gerenciamento de jogos de tabuleiro e suas categorias.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, document); // ente as aspas eu posso escrever 'swagger por exemplo e o endpoint ficaria assim: http://localhost:4000/swagger

  await app.listen(port);
}

bootstrap();
