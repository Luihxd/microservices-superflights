import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { FlightDTO } from './dto/flight.dto';


@Injectable()
export class FlightService {
    constructor( @InjectModel(FLIGHT.name) private readonly model:Model<IFlight>){}

    async createFlight(flightDTO: FlightDTO): Promise<IFlight> {
        const newFligth = new this.model(flightDTO);
        return await newFligth.save();
    }

    async findAllFlights(): Promise<IFlight[]> {
        return await this.model.find().populate('passengers');
    }

    async findFlightById(id: string): Promise<IFlight>{
        return await this.model.findById(id).populate('passengers');
    }

    async updateFlight(id: string, flightDTO: FlightDTO): Promise<IFlight>{
        return await this.model.findByIdAndUpdate(id, flightDTO, {new: true});
    }

    async deleteFlight(id: string){
        await this.model.findByIdAndDelete(id);
        return {
            status: HttpStatus.OK,
            msg: 'Flight Deleted'
        };
    }

    async addPassenger(id: string, passengerId: string): Promise<IFlight>{
        return await this.model.findByIdAndUpdate(id, {
            $addToSet: {passengers: passengerId}}, 
            {new: true}
        ).populate('passengers');
    }
}
