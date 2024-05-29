import { Controller } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDTO } from './dto/passenger.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengerMSG } from 'src/common/constants';


@Controller()
export class PassengerController {

    constructor(private passengerService: PassengerService){}

    @MessagePattern(PassengerMSG.CREATE)
    createPassenger(@Payload() passengerDTO: PassengerDTO){
        return this.passengerService.createPassenger(passengerDTO);
    }

    @MessagePattern(PassengerMSG.FIND_ALL)
    async findAll(){
        return this.passengerService.findAll();
    }

    @MessagePattern(PassengerMSG.FIND_ONE)
    async findOneByid(@Payload() id: string)
    {
        return this.passengerService.findOneByid(id);
    }

    @MessagePattern(PassengerMSG.UPDATE)
    async updateByid(@Payload() payload){
        return this.passengerService.updateByid(payload.id, payload.passengerDTO);
    }

    @MessagePattern(PassengerMSG.DELETE)
    async deleteById(@Payload() id: string) {
        return this.passengerService.deleteByid(id);
    }

}
