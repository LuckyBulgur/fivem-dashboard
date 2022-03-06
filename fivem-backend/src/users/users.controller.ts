import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetSteamUser } from 'src/auth/utils/get-steam-user.decorator';

import { Users } from './users';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {

    constructor(private userService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get("/list")
    async getUserNames(@GetSteamUser() user: Users): Promise<string[]> {
        const userNames = await this.userService.getUserNames(user);
        return userNames;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findOne(@GetSteamUser() user: Users): Promise<Users> {
        return this.userService.findOne(user);
    }
}