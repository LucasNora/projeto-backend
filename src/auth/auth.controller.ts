import { Controller, Get, Param, Res,} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { Response} from 'express';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){

    }

    @Get('code/:code')

    async getUserDataFromGoogle (@Param('code') code: string, @Res() res: Response){

        const result = await this.authService.getUserDataFromGoogle(code);
        
        const user = new UserEntity();
        user.email = result ['email'];
        user.firstName = result['given_name'];
        user.lastName = result ['family_name'];
        user.profileImageUrl = result['picture'];

        console.log('Usuario preenchido com os dados do google', user);

        const token = await this.authService.signIn (user); 
        console.log('Resposta do sign in', token);

        res.send({token: token});

    }
}
