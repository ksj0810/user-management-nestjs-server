import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { secret } from 'config/secret';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    ['/api-docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        teddy: secret.swagger_password,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJS 유저 관리')
    .setDescription('NestJS 유저 관리 스웨거입니다.')
    .setVersion('1.0.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT_NUMBER);
}
bootstrap();
