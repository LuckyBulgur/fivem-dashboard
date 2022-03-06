import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';

import { AuthService } from '../auth.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
    constructor(private authService: AuthService) {
        super({
            returnURL: 'http://localhost:3001/auth/redirect',
            realm: 'http://localhost:3001/',
            apiKey: 'A50F45CA72AE7A7C0872C43FDB0DB843',
        });
    }

    async validate(identifier, profile, done) {
        const profileId: bigint = BigInt(profile.id);
        const hexIdentifier = profileId.toString(16)
        const user = {
            identifier: "steam:" + hexIdentifier,
            username: profile.displayName,
        }
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}