import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';
import { FlightMSG } from 'src/common/constants';
import { Observable } from 'rxjs';
import { IFlight } from 'src/common/interfaces/flight.interface';

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
  }
