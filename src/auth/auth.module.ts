import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/entities/user.entity'
import { JwtService } from '@nestjs/jwt/dist';

@Module({
  imports:[
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: `60s`}
    }),

    TypeOrmModule.forFeature([UserEntity]),
    

  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserEntity,
    JwtService,
})
export class AuthModule {}
