import { Controller} from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';
import { UserDTO } from './dto/user.dto';

@Controller()
export class UserController {
    
    constructor(private readonly userService: UserService){}
    
    @MessagePattern(UserMSG.CREATE)
    create(@Payload() userDTO: UserDTO){
        return this.userService.createUser(userDTO);
    }

    @MessagePattern(UserMSG.FIND_ALL)
    findAll(){
        return this.userService.findAll();
    }

    @MessagePattern(UserMSG.FIND_ONE)
    findOne(@Payload() id: string){
        return this.userService.findOne(id);  
    }

    @MessagePattern(UserMSG.UPDATE)
    update(@Payload() payload: any){
        return this.userService.update(payload.id, payload.userDTO);
    }

    @MessagePattern(UserMSG.DELETE)
    delete(@Payload() id: string){
        return this.userService.delete(id);
    }

    
    @MessagePattern(UserMSG.VALID_USER)    
    async validateUser(@Payload() payload): Promise<any> {
        const user = await this.userService.findByUsername(payload.username);
        const isValidPassword = await this.userService.validatePassword(payload.pass, user.password);
        if(user && isValidPassword) {
            return user
        }
        else{
            // throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
            return null;
          }
    }


}
