import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/users/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('api/v2/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @ApiOperation({summary: 'Sign in user with username and password'})
    @Post('/signin/')
    async signIn(@Req() req) {
       return await this.authService.signIn(req.user);
    }

    @Post('/signup/')
    @ApiOperation({summary: 'Sign up User, Create user (service), Database Insertion'})
    async signUp(@Body() userDTO: UserDTO) {
        return await this.authService.signUp(userDTO);
    }

}
