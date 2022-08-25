import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CottageModule } from 'src/cottage/cottage.module';
import { ReserveEntity } from './entities';
import { ReservController } from './reserv.controller';
import { ReservService } from './reserv.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReserveEntity]), CottageModule],
  providers: [ReservService],
  controllers: [ReservController]
})
export class ReservModule {}
