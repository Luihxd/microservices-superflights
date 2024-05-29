import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMQ } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMPQ_URL],
        queue: RabbitMQ.PassengerQueue,
      }
    });
    await app.listen();
    console.log('Microservice Passenger is listening...');
}
bootstrap();
