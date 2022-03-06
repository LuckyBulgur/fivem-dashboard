import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

import { Owned_vehicles } from './owned_vehicles';

@Injectable()
export class OwnedVehiclesService {

    constructor(@InjectRepository(Owned_vehicles) private vehicleRepository: Repository<Owned_vehicles>, private userService: UsersService) { }

    async findAll(user: Users): Promise<Owned_vehicles[]> {
        const vehicles = await this.vehicleRepository.find({ where: { owner: user.identifier } });

        const sortedVehicles = [];
        for (let i = 0; i < vehicles.length; i++) {
            sortedVehicles.push(vehicles[i].plate);
        }
        return sortedVehicles;
    }

    async transferVehicle(user: Users, transferData: any): Promise<any> {
        const receiver: Users = await this.userService.getUserByName({ firstname: transferData.name.split(" ")[0], lastname: transferData.name.split(" ")[1] });
        const vehicles: Owned_vehicles[] = await this.vehicleRepository.find({ where: { owner: user.identifier } });

        if (receiver.identifier == user.identifier) {
            throw new HttpException('Du kannst dir selber keine Fahrzeuge transferieren', 401);
        }

        if (vehicles.length <= 0) {
            throw new HttpException('Du hast keine Fahrzeuge', 400);
        }

        if (vehicles.find(vehicle => vehicle.plate === transferData.plate)) {
            const vehicle: Owned_vehicles = await this.vehicleRepository.findOne({ where: { plate: transferData.plate } });
            if (vehicle.stored != 1) {
                throw new HttpException('Das Fahrzeug ist nicht eingeparkt', 400);
            }
            vehicle.owner = receiver.identifier;
            await this.vehicleRepository.update(vehicle.plate, vehicle);
            return { message: 'Auto erfolgreich transferiert' };
        } else {
            throw new HttpException('Dieses Fahrzeug gehört dir nicht', 400);
        }
    }
}