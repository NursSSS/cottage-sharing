import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateManagerDto, CreateUserDto, RecoverUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { GenerateTokenDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly UsersService: UsersService,
        private readonly JwtService: JwtService
    ){}

    async login(dto: LoginDto){
        const user = await this.validateUser(dto)
        
        return await this.generateToken(user)
    }
    
    async signin(dto: CreateUserDto){
        const user: any = await this.UsersService.createUser(dto)
        
        return await this.generateToken(user)
    }

    private async generateToken(user){
        const payload = {
            id: user.id,
            name: user.name,
            roles: user.roles
        }

        return {
            token: this.JwtService.sign(payload)
        }
    }

    private async validateUser(dto: LoginDto){
        const user = await this.UsersService.findByNumber(dto.phoneNumber)
        const passEquals = await bcrypt.compare(dto.password, user.password)

        if(user && passEquals){
            return user
        }

        throw new UnauthorizedException('Неправильный пароль или номер телефон')
    }

    async registrationManager(dto: CreateManagerDto){
        const user = await this.UsersService.createManager(dto)

        return await this.generateToken(user)
    }

    async recoverPass(dto: RecoverUserDto){
        const user = await this.UsersService.recoverPass(dto)

        return await this.generateToken(user)
    }
}
