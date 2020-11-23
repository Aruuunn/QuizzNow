import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import UserRepository from './user.repository';

@Injectable()
export class UserService {
  private userRepo: UserRepository;
  private logger:Logger = new Logger("UserService")
  constructor(private readonly connection: Connection) {
    this.userRepo = this.connection.getCustomRepository(UserRepository);
  }

  findByEmail = async (email: string, relations: string[] = []) => {
    const user = await this.userRepo.findOne({ email }, {  relations });
    this.logger.log(`[findByEmail] ${user ? "Found" : "Did not find"} a user with email ${email} ${user ? user.id : null}`);
    return user;
  };
}
