import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';

import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = userCredentialsDto;
    
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
  }
}
