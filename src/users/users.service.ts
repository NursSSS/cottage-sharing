import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManagerDto, CreateUserDto, RecoverUserDto, UpdateManagerDto, } from './dto';
import { UsersEntity } from './entities';
import * as randomstring from 'randomstring';
import * as bcrypt from 'bcrypt'
import { UserRole } from './entities/role.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity) 
        private readonly UserRepository: Repository<UsersEntity>){}
    
    async findAll(){
            return await this.UserRepository.find()
        }
    
    async findByNumber(phoneNumber: string){
        const db = await this.UserRepository.find()
        const user = db.find((i) => i.phoneNumber.includes(phoneNumber))
        return user
    }

    private async sendPass(dto){
        dto.password = randomstring.generate(7)

        const whatsAppClient = require("@green-api/whatsapp-api-client");
        const restAPI = whatsAppClient.restAPI({
            idInstance: "1101754450",
            apiTokenInstance: "7a33a1ed430f4a568d338bb76b2945a4536a54315fa54a3882"
        });

        await restAPI.message.sendMessage(
            null,
            Number(dto.phoneNumber),
            'Ваш пароль от Cottage Sharing: '+dto.password
            );
        
        const hashPass = await bcrypt.hash(dto.password, 5)
        dto.password = hashPass
        return dto
        }
        
    async createUser(dto: CreateUserDto){
        const db_user = await this.findByNumber(dto.phoneNumber)
        if(db_user){
            throw new NotFoundException('Пользователь с таким номером уже существует')
        }

        const user = await this.sendPass(dto)
        user.roles = UserRole.USER

        await this.UserRepository.save(user)
        return user
    }

    async createManager(dto: CreateManagerDto){
        const db_user = await this.findByNumber(dto.phoneNumber)
        if(db_user){
            throw new NotFoundException('Пользователь с таким номером уже существует')
        }

        const user = await this.sendPass(dto)
        user.roles = UserRole.MANAGER

        await this.UserRepository.save(user)
        return user
    }
    
    async updateManager(dto: UpdateManagerDto){
        const user = await this.findManagerById(dto.id)
        Object.assign(user, dto)
        return await this.UserRepository.save(user)
    }

    async findManagerById(id: number){
        const user = await this.UserRepository.findOne({ 
            where: { 
                id: id,
                roles: UserRole.MANAGER 
            }})

        if(!user){
            throw new NotFoundException('Менеджер не найден')
        }

        return user
    }

    async findManagers(){
        const users = await this.UserRepository.find({
            where: { 
                roles: UserRole.MANAGER
            }})

        return users
    }

    async findManagersByName(name: string){
        const users = await this.UserRepository.find({
            where: { 
                name: name,
                roles: UserRole.MANAGER
            }})

        if(!users){
            throw new NotFoundException('Менеджер(ы) не найден(ы)')
        }

        return users
    }

    async deleteManager(id: number){
        const user = await this.findManagerById(id)

        await this.UserRepository.remove(user)
        return { message: 'Менеджер успешно удален' }
    }

    async recoverPass(dto: RecoverUserDto){
        const db_user = await this.findByNumber(dto.phoneNumber)
        if(!db_user){
            throw new NotFoundException('Пользователь с таким номером не существует')
        }

        const user = await this.sendPass(dto)
        Object.assign(db_user, user)
        return await this.UserRepository.save(db_user)
    }
}
