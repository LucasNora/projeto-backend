import { Controller, Get, Param, Res,} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){

    }

    @Get('code/:code')

    async getUserDataFromGoogle (@Param('code') code: string, @Res() res: Response){

        //1 - Obter os dados do usuario do google
        const result = await this.authService.getUserDAtaFromGoogle(code);
        console.log(result);
        return res.send ({data: result});

        //2 - Verificar se os dados conferem com algum usuario cadastrado na minha base (banco de dados)
        const user = new UserEntity();
        user.email = result ['email'];
        user.firstName = result['given_name'];
        user.lastName = result ['family_name'];
        user.profileImageUrl = result['picture'];

        const token = await this.authService,signIn(user); 

        res.send({token: token});

        


        //3 - Enviar a resposta adequada para o meu usuario


        
    }

    



}
