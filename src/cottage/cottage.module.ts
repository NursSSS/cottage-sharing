import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { CottageController } from './cottage.controller';
import { CottageService } from './cottage.service';
import { CottageEntity } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([CottageEntity]), UsersModule],
    providers: [CottageService],
    controllers: [CottageController],
    exports: [CottageService]
})
export class CottageModule {}
