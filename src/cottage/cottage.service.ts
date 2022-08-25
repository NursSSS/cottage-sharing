import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCottageDto, UpdateCottageDto } from './dto';
import { CottageEntity } from './entities';

@Injectable()
export class CottageService {
    
    constructor(
        @InjectRepository(CottageEntity)
        private readonly CottageRepository: Repository<CottageEntity>,
        private readonly UsersService: UsersService) {}

    async findAll(){
        return await this.CottageRepository.find()
    }

    async findCtgByName(name: string){
        const ctg = await this.CottageRepository.findOne({where: {name}})
        if(!ctg){
            throw new NotFoundException('Коттедж с таким именем не найден')
        }

        return ctg
    }

    async findCtgById(id: number){
        const ctg = await this.CottageRepository.findOne({where: {id}})
        if(!ctg){
            throw new NotFoundException('Коттедж не найден')
        }
        return ctg
    }

    async createCtg(dto: CreateCottageDto){
        const ctg = await this.CottageRepository.save(dto)
        return ctg
    }

    async deleteCtg(id: number){
        const ctg = await this.findCtgById(id)

        await this.CottageRepository.remove(ctg)
        return { message: 'Коттедж успешно удален' }
    }

    async updateCtg(dto: UpdateCottageDto){
        const ctg = await this.findCtgById(dto.id)

        Object.assign(ctg, dto)
        
        await this.CottageRepository.save(ctg)
        return ctg
    }

    async findCtgFromManager(id: number){
        const ctg = await this.CottageRepository.findOne({where: {manager_id: id}})

        if(!ctg){
            throw new NotFoundException('Вы еще не относитесь определенному коттеджу')
        }

        return ctg
    }
}
