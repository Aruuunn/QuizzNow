import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import UserRepository from './user.repository';

@Injectable()
export class UserService {
    private userRepo: UserRepository
  constructor(
  private readonly connection:Connection
  ) {
      this.userRepo = this.connection.getCustomRepository(UserRepository);
  }

  findByEmail = async (email: string) => {
  
    return await this.userRepo.findOne({email},{cache:true,});
  };
}
