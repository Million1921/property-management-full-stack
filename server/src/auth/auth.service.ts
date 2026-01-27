import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        console.log(`Validating user: ${email}`);
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            console.log(`User not found: ${email}`);
            return null;
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        console.log(`Password match for ${email}: ${isMatch}`);

        if (isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }

    async register(userData: any) {
        const existingUser = await this.usersService.findByEmail(userData.email);
        if (existingUser) {
            throw new UnauthorizedException('User already exists');
        }
        const user = await this.usersService.create(userData);
        return this.login(user);
    }
}
