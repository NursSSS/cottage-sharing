import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateManagerDto, CreateUserDto, RecoverUserDto } from 'src/users/dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}
      
    @Post('/login')
    @ApiOkResponse()
    @ApiUnauthorizedResponse({ description: 'Неправильный пароль или номер телефон' })
    async login(@Body() dto:LoginDto){
        return await this.authService.login(dto)
    }
    

    @Post('/signin')
    @ApiOkResponse()
    @ApiBadRequestResponse({ description: 'Пользователь с таким номером уже существует' })
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
