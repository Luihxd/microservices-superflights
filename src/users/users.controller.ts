import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';
import { IUser } from 'src/common/interfaces/user.interface';
import { Observable } from 'rxjs';
import { UserMSG } from 'src/common/constants';

@Controller('api/v2/users')
export class UsersController {
    private _clientProxyUser
    
    constructor(private readonly clientProxy: ClientProxySuperFlights
    ){
        this._clientProxyUser = this.clientProxy.clientProxyUsers();
    }

    @Post("/create/")
    createUser(@Body() userDTO: UserDTO): Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
    }

    @Get("/get_all/")
    findAllUsers(): Observable<IUser[]> {
        return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
    }

    @Get("/get_by_id/:id")
    findUserById(@Param('id') id: string): Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
    }

    @Put("/update/:id")
    updateUser(@Param('id') id: string, @Body() userDTO: UserDTO): Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.UPDATE, {id, userDTO});
    }

    @Get("/delete/:id")
    deleteUser(@Param('id') id: string): Observable<any> {
        return this._clientProxyUser.send(UserMSG.DELETE, id);
    }

}
