import { Controller } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';

@Controller('api/v2/flights')
export class FlightController {
    
  private _clientProxyFlight;

  constructor(private readonly clientProxy: ClientProxySuperFlights){
    this._clientProxyFlight = this.clientProxy.clientProxyFlights();
  }

}
