import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PassengerMSG } from 'src/common/constants';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { PassengerDTO } from './dto/passenger.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('passenger')
@Controller('api/v2/passengers')
export class PassengerController {
    private _clientProxyPassengers
    constructor(
        private readonly clientProxy: ClientProxySuperFlights
    ) {
        this._clientProxyPassengers = this.clientProxy.clientProxyPassengers()
    }

    @Post("/create/")
    createPassenger(@Body() passengerDTO: PassengerDTO): Observable<IPassenger> {
        return this._clientProxyPassengers.send(PassengerMSG.CREATE, passengerDTO);
    }

    @Get("/get_all/")
    findAllPassengers(): Observable<IPassenger[]> {
        return this._clientProxyPassengers.send(PassengerMSG.FIND_ALL, '');
    }

    @Get("/get_by_id/:id")
    findPassengerById(@Param("id") id: string): Observable<IPassenger> {
        return this._clientProxyPassengers.send(PassengerMSG.FIND_ONE, id);
    }

    @Put("/update/:id")
    updatePassenger(@Param("id") id: string, @Body() passengerDTO: PassengerDTO): Observable<IPassenger> {
        return this._clientProxyPassengers.send(PassengerMSG.UPDATE, {id, passengerDTO});
    }

    @Delete("/delete/:id")
    deletePassenger(@Param("id") id: string): Observable<IPassenger> {
        return this._clientProxyPassengers.send(PassengerMSG.DELETE, id);
    }


}
