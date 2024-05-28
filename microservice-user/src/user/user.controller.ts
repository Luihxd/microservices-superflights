import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';


@Controller()
export class UserController {
    
    constructor(private readonly userService: UserService){}
    
    
    @Post("/create/")
    create(@Body() UserDTO: UserDTO){
        return this.userService.createUser(UserDTO);
    }

    @Get("/get_all/")
    findAll(){
        return this.userService.findAll();
    }

    @Get("/get_by_id/:id")
   findOne(@Param("id") id: string){
        return this.userService.findOne(id);
        
    }

    @Put("/update/:id")
    update(@Param("id") id: string, @Body() userDTO: UserDTO){
        return this.userService.update(id, userDTO);
    }

    @Delete("/delete/:id")
   delete(@Param("id") id: string){
        return this.userService.delete(id);
    }

}
