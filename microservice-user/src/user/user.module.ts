import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    //Conexión del esquema para el modelo de usuario en la base de datos
    MongooseModule.forFeatureAsync([{
      name: USER.name,
      useFactory: () => {
        return UserSchema;
      }
    }])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
