import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../models/jwt-payload.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (configService.get('NODE_ENV') === 'production' && !jwtSecret) {
      throw new Error('JWT_SECRET must be defined in production environment');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret || 'default_jwt_secret_for_development',
    });
  }

  async validate(payload: JwtPayload) {
    try {
      return await this.usersService.findById(payload.sub);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }
}
