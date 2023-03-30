import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  userRepository: any;

  constructor(
    @InjectRepository(User)
    private readonly yserRpository: Repository<User>
  ){}


  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)    
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto); 
  }

  async remove(id: number) {
    return this.userRepository.delete(await this.findOne(id)); 
  }

 
}
