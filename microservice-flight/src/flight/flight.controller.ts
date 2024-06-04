import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';


@Controller()
export class FlightController {
    constructor(private readonly flightService: FlightService,
    ){}

    @Post("/create/")
    create(@Body() flightDTO: FlightDTO){
        return this.flightService.createFlight(flightDTO);
    }

    @Get("/get_all/")
    findAllFlights(){
        return this.flightService.findAllFlights();
    }

    @Get("/get_by_id/:id")
    findFlightById(@Param("id") id: string){
        return this.flightService.findFlightById(id);
    }

    @Put("/update_by_id/:id")
    updateFlight(@Param("id") id: string, @Body() flightDTO: FlightDTO){
        return this.flightService.updateFlight(id, flightDTO);
    }

    @Delete("/delete_by_id/:id")
    deleteFlight(@Param("id") id: string){
        return this.flightService.deleteFlight(id);
    }

    @Post("/add_passenger/:id/passenger/:passengerId")      
    async addPassenger(@Param("id") id: string, @Param("passengerId") passengerId: string){
        console.log(id, passengerId)
        // const passenger = await this.passengerService.findOneByid(passengerId);
        // if(!passenger)
        //     throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
        // return this.flightService.addPassenger(id, passengerId);
    }
}
