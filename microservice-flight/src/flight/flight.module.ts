import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT, PASSENGER } from 'src/common/models/models';
import { FlightSchema } from './schema/flight.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGHT.name,
        //require('mongoose-autopopulate'), 
        //Este plugin obtiene la información de los pasajeros y no solo su id @
        useFactory: () => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          return FlightSchema.plugin(require('mongoose-autopopulate')); 
        }
      },
      {
        name: PASSENGER.name,
        useFactory: () => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          return FlightSchema.plugin(require('mongoose-autopopulate')); 
        }
      }
    
    ]),
    
  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
