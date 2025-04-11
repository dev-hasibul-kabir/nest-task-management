import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
  ) {}

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { email, password } = authCredentialDto;
    const user = this.authRepository.create({ email, password });

    try {
      await this.authRepository.save(user);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.code === '23505') {
        // emai already exist error code
        throw new ConflictException('Email already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
