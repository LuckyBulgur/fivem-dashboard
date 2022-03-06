import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetSteamUser } from 'src/auth/utils/get-steam-user.decorator';
import { Users } from 'src/users/users';

import { OwnedVehiclesService } from './owned-vehicles.service';
import { Owned_vehicles } from './owned_vehicles';

@Controller('vehicles')
export class OwnedVehiclesController {

    constructor(private vehicleSerice: OwnedVehiclesService) { }

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async findAll(@GetSteamUser() user: Users): Promise<Owned_vehicles[]> {
        return this.vehicleSerice.findAll(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/transfer")
    async transferVehicle(@GetSteamUser() user: Users, @Body() data: any): Promise<any> {
        return this.vehicleSerice.transferVehicle(user, data);
    }

}