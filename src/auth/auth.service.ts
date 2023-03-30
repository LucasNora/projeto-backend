import { Inject, Injectable } from '@nestjs/common';
import { Code } from 'typeorm';
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
        return this.jwtService.sign(payload { secret: process.env.JWT_SECRET });
    }


    async getUserDAtaFromGoogle(code: string) {
        //1- Obter os dados do usuario do google

        const result = await fetch(`${process.env.GOOGLE_PROFILE_URL}${code}`, { headers: { 'Content_Type': 'text' } });
        return await result.json();
    }

    async signIn(user: UserEntity) {
        //1- Verificar se o usuario ja existe
        const registeredUser = await this.userService.findOneByEmail(user.email);
        if (registeredUser) {
            //Se existir, retornar o toke do usuario
            return this.generateJwt(registeredUser);   //Gerar token do usuario


        } else {
            //2-Caso nao exista
            //Sign Up
            const newUser = await this.signUp(user);
            return this.generateJwt(newUser);

        }
    } 

        async signUp(user: UserEntity): Promise<UserEntity{
            const newUser = await this.userService.create(user);
            return newUser;


        }

    }







        //2- Enviar a resposta para o controller
        return await result.json();


    }



}
function signUp(user: UserEntity, UserEntity: any) {
    throw new Error('Function not implemented.');
}

