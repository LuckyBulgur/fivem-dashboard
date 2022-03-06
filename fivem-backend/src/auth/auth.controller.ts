import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SteamAuthGuard } from './guards/steam-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }


    @Get("/login")
    @UseGuards(SteamAuthGuard)
    async steamAuth(@Request() req: any) { }

    @Get("/redirect")
    @UseGuards(SteamAuthGuard)
    steamAuthCallback(@Request() req: any, @Res() res: any) {
        return this.authService.steamLogin(req.user, res);
    }
}