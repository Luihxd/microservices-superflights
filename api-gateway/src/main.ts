import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global filters
  app.useGlobalFilters(new AllExceptionFilter());
  //Global interceptors
  app.useGlobalInterceptors(new TimeOutInterceptor());

  const options = new DocumentBuilder()
  .setTitle("Superflight API v2")
  .setDescription("Scheduled flights Microservices")
  .setVersion("2.0.0")
  ///.addBearerAuth()
  .build();

  app.enableCors();

  const document = SwaggerModule.createDocument(app, options);
  

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
