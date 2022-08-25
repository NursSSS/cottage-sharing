import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateManagerDto, UpdateManagerDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService){}
    
    @Get()
    async findAll(){
        return await this.UsersService.findAll()
    }

    @Post('/manager')
    async createManager(@Body() dto: CreateManagerDto){
        return await this.UsersService.createManager(dto)
    }

    @Put('manager/')
    async updateManager(@Body() dto: UpdateManagerDto){
        return await this.UsersService.updateManager(dto)
    }

    @Get('manager')
    async findManagers(){
        return await this.UsersService.findManagers()
    }

    @Get('manager/:id')
    async findManagerById(@Param('id') id: number){
        return await this.UsersService.findManagerById(id)
    }

    @Get('managerName/:name')
    async findManagerByName(@Param('name') name: string){
        return await this.UsersService.findManagersByName(name)
    }

    @Delete('manager/:id')
    async deleteManager(@Param('id') id: number){
        return await this.UsersService.deleteManager(id)
    }
}
