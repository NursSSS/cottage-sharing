import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserRole } from 'src/users/entities/role.enum';
import { Roles } from 'src/users/entities/roles.decorator';
import { CreateReserveDto } from './dto';
import { ReservService } from './reserv.service';

@Controller('reserv')
export class ReservController {
    constructor(
        private readonly ReservService: ReservService
    ){}

    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @Get()
    async findAll(){
        return await this.ReservService.findAll()
    }

    @Post()
    async createReserve(@Body() dto: CreateReserveDto){
        return await this.ReservService.createReserve(dto)
    }

    @Get(':id')
    async findReserve(@Param('id') id: number){
        return await this.ReservService.findReserve(id)
    }

    @Delete(':id')
    async deleteReserve(@Param('id') id: number){
        return await this.ReservService.delete(id)
    }
}
