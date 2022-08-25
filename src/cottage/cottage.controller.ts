import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserRole } from 'src/users/entities/role.enum';
import { Roles } from 'src/users/entities/roles.decorator';
import { CottageService } from './cottage.service';
import { CreateCottageDto, UpdateCottageDto } from './dto';

@Controller('cottage')
export class CottageController {
    constructor(
        private readonly CottageService: CottageService
    ){}
    
    @Roles(UserRole.ADMIN)
    @Get()
    async findAll(){
        return this.CottageService.findAll()
    }

    @Get('name/:value')
    async findCtgByName(@Param('value') name: string){
        return this.CottageService.findCtgByName(name)
    }

    @Get(':id')
    async findCtgById(@Param('id') id: number){
        return this.CottageService.findCtgById(id)
    }

    @Roles(UserRole.ADMIN)
    @Post()
    async createCtg(@Body() dto: CreateCottageDto){
        return this.CottageService.createCtg(dto)
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async deleteCtg(@Param('id') id: number){
        return this.CottageService.deleteCtg(id)
    }

    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @Put()
    async updateCtg(@Body() dto: UpdateCottageDto){
        return this.CottageService.updateCtg(dto)
    }
}
