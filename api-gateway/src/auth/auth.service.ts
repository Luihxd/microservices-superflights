import {  Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMSG } from 'src/common/constants';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDTO } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {

    // constructor(private readonly userService: UserService,
    constructor(
                private readonly clientProxy: ClientProxySuperFlights,         
                private readonly jwtService: JwtService
    ){}

    private clientProxyUser = this.clientProxy.clientProxyUsers();

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.clientProxyUser.send(UserMSG.VALID_USER, {username, pass})
        .toPromise();
        
        if(user) {
            return user
        }
        else{
            // throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
            return null;
        }
    }

    async signIn(user: any){
        const payload = { 
            username: user.username, 
            sub: user._id
        };
        return { access_token: this.jwtService.sign(payload) };
    }

    async signUp(userDTO: UserDTO){
        return await this.clientProxyUser.send(UserMSG.CREATE, userDTO).toPromise();
    }
}
