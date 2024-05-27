import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';
import { FlightMSG, PassengerMSG } from 'src/common/constants';
import { Observable } from 'rxjs';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('flights')
@Controller('api/v2/flights')
export class FlightController {
    
  private _clientProxyFlight;
  private _clientProxyPassenger;

  constructor(private readonly clientProxy: ClientProxySuperFlights){
    this._clientProxyFlight = this.clientProxy.clientProxyFlights();
    this._clientProxyPassenger = this.clientProxy.clientProxyPassengers();
  }

    @Post("/create/")
    createFlight(@Body() flightdto: FlightDTO): Observable<IFlight> 
    {
      return this._clientProxyFlight.send(FlightMSG.CREATE, flightdto);
    }

    @Get("get_all")
    findAllFlights(): Observable<IFlight[]>
    {
      return this._clientProxyFlight.send(FlightMSG.FIND_ALL);
    }

    @Get("get_by_id/:id")
    findFlightById(@Param('id') id: string): Observable<IFlight> {
      return this._clientProxyFlight.send(FlightMSG.FIND_ONE, id);
    }

    @Put("update/:id")
    updateFlight(@Param('id') id: string, @Body() flightDTO: FlightDTO): Observable<IFlight>
    {
      return this._clientProxyFlight.send(FlightMSG.UPDATE, {id, flightDTO});
    }

    @Delete("delete/:id")
    deleteFlight(@Param('id') id: string): Observable<any>
    {
      return this._clientProxyFlight.send(FlightMSG.DELETE, id);
    }

    @Post("add_passenger/:flightId/passenger/:passengerId")
    async addPassenger(
      @Param('flightId') flightId: string, 
      @Param('passengerId') passengerId: string): Promise<Observable<any>>
    {
      const passenger = await this._clientProxyPassenger
      .send(PassengerMSG.FIND_ONE, passengerId)
      .toPromise();
      if(!passenger)
      {
        throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
      }
      return this._clientProxyFlight.send(FlightMSG.ADD_PASSENGER, {flightId, passenger});
    }
  }
