import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { IUser } from 'src/common/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common/models/models';

@Injectable()
export class UserService {
    constructor( @InjectModel(USER.name) private readonly model:Model<IUser>){

    }
    async hashPassword(password: string):Promise<string>{
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async createUser(userDTO: UserDTO): Promise<IUser>{
        const hash = await this.hashPassword(userDTO.password); 
        const newUser = new this.model({...userDTO, password: hash});
        return await newUser.save();
    }

    async findAll(): Promise<IUser[]>{
        return await this.model.find();
    }

    async findOne(id: string): Promise<IUser>{
        return await this.model.findById(id);
    }

    async update(id: string, userDTO: UserDTO): Promise<IUser>{
        const hash = await this.hashPassword(userDTO.password);
        const newUser = {...userDTO, password: hash};
        return await this.model.findOneAndUpdate({_id: id}, newUser, {new: true});
    }

    async delete(id: string){
        let response = {};
        try{
           const deleteUser = await this.model.findByIdAndDelete(id);
            if(deleteUser){
                response = { status: HttpStatus.OK, msg: 'User Deleted'}
            }else{
                response = { status: HttpStatus.FORBIDDEN, msg: 'Usser not found'}
            }
        }catch(error){
            response = { status: HttpStatus.FORBIDDEN, msg: error};
        }
        return response;
    }

    async findByUsername(username: string): Promise<IUser>{
        return await this.model.findOne({username});
    }

    async validatePassword(password: string, dbPassword: string): Promise<boolean>{
        return await bcrypt.compare(password, dbPassword);
    }
}
