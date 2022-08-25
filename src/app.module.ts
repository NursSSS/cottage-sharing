import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './configs';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CottageModule } from './cottage/cottage.module';
import { ReservModule } from './reserv/reserv.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard.dto';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, AuthModule, CottageModule, ReservModule],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  },{
    provide: APP_GUARD,
    useClass: RolesGuard
  }]
})
export class AppModule {}
