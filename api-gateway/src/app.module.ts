import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProxyModule } from './common/proxy/proxy.module';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    UsersModule,
    ProxyModule,
    PassengerModule,
    FlightModule,                                                 
    AuthController,
    
      
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
