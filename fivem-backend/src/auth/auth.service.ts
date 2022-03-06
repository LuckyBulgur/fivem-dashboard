import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) { }

    steamLogin(user, res) {
        const payload = { identifier: user.identifier, username: user.username };
        if (!user) {
            throw new Error('User not found');
        }

        res.redirect(`http://localhost:3000/dashboard?access_token=${this.jwtService.sign(payload)}`);
    }

}