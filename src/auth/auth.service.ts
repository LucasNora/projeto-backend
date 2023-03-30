import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {

    constructor(
        @Inject(UserEntity) private userService: UserService,
        private jwtService: JwtService
    ) {
    }
    generateJwt(payload) {
        return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
    }
    async getUserDataFromGoogle(code: string) {
        const result = await fetch(`${process.env.GOOGLE_PROFILE_URL}${code}`, { headers: { 'Content_Type': 'text' } });
        return await result.json();
    }
    async signIn(user: UserEntity) {
        const registeredUser = await this.userService.findOneByEmail(user.email);
        console.log('Resultado da pesquisa de usuario por email', registeredUser);
        if (registeredUser) {
            return this.generateJwt(JSON.parse(JSON.stringify(registeredUser)));
        } else {
            const newUser = await this.signUp(user);
            console.log('Usuario criado no banco de dados', newUser);
            return this.generateJwt(JSON.parse(JSON.stringify(newUser)));
        }
    }
    async signUp(user: UserEntity): Promise<UserEntity> {
        const newUser = await this.userService.create(user);
        return newUser;
    }
}


