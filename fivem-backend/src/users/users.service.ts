import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './users';

const carTypes = [
    "Mercedes Amg aller",
    "SUIII",
    "Import ka auto",
    "Vanilla",
    "Nikka"
]


@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) { }

    async getUserNames(user): Promise<string[]> {
        const users = await this.usersRepository.find();
        for (let i = 0; i < users.length; i++) {
            if (users[i].identifier == user.identifier) {
                users.splice(i, 1);
            }
        }
        return users.map(user => user.firstname + ' ' + user.lastname);
    }

    async findOne(user: Users): Promise<Users> {
        return await this.usersRepository.findOne({ where: { identifier: user.identifier } });
    }

    async getUserByName(name: { firstname: string, lastname: string }): Promise<Users> {
        return await this.usersRepository.findOne({ where: { firstname: name.firstname, lastname: name.lastname } });
    }
}
