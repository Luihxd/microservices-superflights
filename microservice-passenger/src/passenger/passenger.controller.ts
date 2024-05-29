import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDTO } from './dto/passenger.dto';


@Controller('api/v1/passengers')
export class PassengerController {

    constructor(private passengerService: PassengerService){}

    @Post("/create/")
    createPassenger(@Body() passengerDTO: PassengerDTO){
        return this.passengerService.createPassenger(passengerDTO);
    }

    @Get("/get_all/")
    async findAll(){
        return this.passengerService.findAll();
    }

    @Get("/get_by_id/:id")
    async findOneByid(@Param("id") id: string)
    {
        return this.passengerService.findOneByid(id);
    }

    @Put("/update_by_id/:id")
    async updateByid(@Param("id") id: string, @Body() passengerDTO: PassengerDTO){
        return this.passengerService.updateByid(id, passengerDTO);
    }

    @Delete("/delete_by_id/:id")
    async deleteById(@Param("id") id: string) {
        return this.passengerService.deleteByid(id);
    }

}
