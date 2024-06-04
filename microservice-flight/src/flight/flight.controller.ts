import { Controller } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMSG } from 'src/common/constants';


@Controller()
export class FlightController {
    _clientProxyPassenger: any;
    _clientProxyFlight: any;
    constructor(private readonly flightService: FlightService,
    ){}

    @MessagePattern(FlightMSG.CREATE)
    create(@Payload() flightDTO: FlightDTO){
        return this.flightService.createFlight(flightDTO);
    }

    @MessagePattern(FlightMSG.FIND_ALL)
    findAllFlights(){
        return this.flightService.findAllFlights();
    }

    @MessagePattern(FlightMSG.FIND_ONE)
    findFlightById(@Payload("id") id: string){
        return this.flightService.findFlightById(id);
    }

    @MessagePattern(FlightMSG.UPDATE)
    updateFlight(@Payload() payload){
        return this.flightService.updateFlight(payload.id, payload.flightDTO);
    }


    @MessagePattern(FlightMSG.UPDATE)
    deleteFlight(@Payload() id: string){
        return this.flightService.deleteFlight(id);
    }

    @MessagePattern(FlightMSG.ADD_PASSENGER)
    addPassenger(
      @Payload() payload){
        return this.flightService.addPassenger(payload.flightId, payload.passengerId);
    }
}
