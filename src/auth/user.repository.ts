import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';

import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = userCredentialsDto;
    const salt = await bcrypt.genSalt();
    
    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;
    try{
        await user.save();
    } catch (error) {
        if(error.code === '23505') {
            throw new ConflictException('Username already exists');
        } else {
            throw new InternalServerErrorException();
        }
        console.log(error.code);
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
      return await bcrypt.hash(password, salt);
  }
}
