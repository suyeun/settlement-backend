import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  // CORS 설정
  app.enableCors({
    origin: ['http://localhost:3000'], // React 앱 URL
    credentials: true,
  });

  // Validation Pipe 글로벌 설정
  app.useGlobalPipes(new ValidationPipe());

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('CATCH12 API 문서')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'JWT Authorization header using the Bearer scheme. Example: "Bearer {token}"',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3001);
  console.log('백엔드 서버가 http://localhost:3001에서 실행중입니다.');
  console.log('Swagger 문서: http://localhost:3001/api-docs');
}
bootstrap(); 