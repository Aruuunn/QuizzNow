import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import UserEntity from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>) {
  }

  findByEmail = async (userEmail: string, relations: string[] = []) => {
    const user = await this.userEntityRepository.findOne({ userEmail }, {  relations });
    return user;
  };
}
