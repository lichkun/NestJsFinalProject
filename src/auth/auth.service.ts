import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (user.passwordHash !== password) {
      throw new UnauthorizedException(`Invalid email or password`);
    }

    const payload = { sub: user.id, email: user.email }; // Use email for the username in the JWT payload
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
