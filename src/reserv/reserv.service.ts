import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { iif } from 'rxjs';
import { CottageService } from 'src/cottage/cottage.service';
import { Between, Repository } from 'typeorm';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { ReserveEntity, Tariff } from './entities';

@Injectable()
export class ReservService {
    constructor(
        @InjectRepository(ReserveEntity)
        private readonly ReserveRepository: Repository<ReserveEntity>,
        private readonly CottageService: CottageService
    ){}

    async findAll(){
        return await this.ReserveRepository.find()
    }

    async createReserve(dto: CreateReserveDto){
        if(dto.qnty_days > 90){
            throw new BadRequestException('Максимальный срок аренды 90 дней')
        }

        dto.date_start = new Date(dto.date_start)
        dto.date_end = new Date(dto.date_start)
        dto.date_end.setDate(dto.date_start.getDate() + dto.qnty_days + 2)

        if ( [6, 0].includes(dto.date_start.getDay()) || [6, 0].includes(dto.date_end.getDay())) {
            throw new BadRequestException('Начало и конец брони не может выпадать на выходные')
        } else if (dto.date_start.getHours() == 12 || dto.date_start.getHours() == 13) {
            throw new BadRequestException('В обеденное время нельзя забронивать(12-13)')
        } else if(dto.date_start < new Date()){
            throw new BadRequestException('Укажите правильную дату')
        }

        const tariff = await this.tariffPlane(dto.tariff)
        Object.assign(dto, tariff)

        const ctg = await this.CottageService.findCtgById(dto.cotagge_id)
        const reserves = await this.ReserveRepository.find({where: {
            cotagge_id: dto.cotagge_id,
            date_start: Between(dto.date_start, dto.date_end)
        }})
        const wholeCtg = reserves.find((i) => i.whole_cottage === true)
        if(wholeCtg){
            throw new BadRequestException('В это время весь коттедж забронирован')
        }

        const activePlaces = reserves.reduce((a,b) => 
            a - b.places, ctg.sleepPlaces
        )

        if(activePlaces < dto.places){
            throw new BadRequestException(`В это время недостаточно мест. Свободных мест ${activePlaces}`)
        }

        if(dto.qnty_days >= 3 && dto.qnty_days <= 5){
            dto.price = dto.price/100*90
        }else if(dto.qnty_days >= 6 && dto.qnty_days <= 14){
            dto.price = dto.price/100*85
        }else if(dto.qnty_days >= 15){
            dto.price = dto.price/100*80
        }

        return await this.ReserveRepository.save(dto)
    }

    async tariffPlane(tariff: Tariff) {
        switch (tariff) {
            case Tariff.FIRST:
                return { price: 2500, places: 4, whole_cottage: false}
            case Tariff.SECOND:
                return { price: 3500, places: 6, whole_cottage: false}
            case Tariff.THIRD:
                return { price: 4500, places: 8, whole_cottage: false}
            case Tariff.SPECIAL_FIRST:
                return { price: 3000, places: 5, whole_cottage: true}
            case Tariff.SPECIAL_SECOND:
                return { price: 4000, places: 8, whole_cottage: true}
            case Tariff.SPECIAL_THIRD:
                return { price: 5000, places: 10, whole_cottage: true}
        }
    }

    async findReserve(id: number){
        const reserv = await this.ReserveRepository.findOne({ where: {id} })
        if(!reserv){
            throw new NotFoundException('Бронь не найдена')
        }

        return reserv
    }

    async delete(id: number){
        const reserv = await this.findReserve(id)

        await this.ReserveRepository.remove(reserv)
        return { message: 'Бронь успешна удалена' }
    }
}
