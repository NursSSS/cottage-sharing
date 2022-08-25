import { Body, Controller, Post } from '@nestjs/common';
import { CreateManagerDto, CreateUserDto, RecoverUserDto } from 'src/users/dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}
      
    @Post('/login')
    async login(@Body() dto:LoginDto){
        return await this.authService.login(dto)
    }
    
    @Post('/signin')
    async signin(@Body() dto:CreateUserDto){
        return await this.authService.signin(dto)
    }

    @Post('/manager')
    async registrationManager(@Body() dto: CreateManagerDto){
        return await this.authService.registrationManager(dto)
    }

    @Post('/recover')
    async recoverPass(@Body() dto: RecoverUserDto){
        return await this.authService.recoverPass(dto)
    }
}
