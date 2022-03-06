import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { OwnedVehiclesController } from './owned-vehicles.controller';
import { OwnedVehiclesService } from './owned-vehicles.service';
import { Owned_vehicles } from './owned_vehicles';

@Module({
    imports: [TypeOrmModule.forFeature([Owned_vehicles]), UsersModule],
    providers: [OwnedVehiclesService],
    controllers: [OwnedVehiclesController]
})
export class OwnedVehiclesModule { }
