import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { PassengerDTO } from "src/passenger/dto/passenger.dto";

export class FlightDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly pilot: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly airplane: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly destinationCity: string;
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly flightDate: Date
    //@IsNotEmpty()
    @ApiProperty()
    readonly passengers: PassengerDTO
}