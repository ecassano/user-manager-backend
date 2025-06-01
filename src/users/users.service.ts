import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto) {
    const { password, name, email, username } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (email.endsWith('@conectar')) {
      const user = this.usersRepository.create({
        username: createUserDto.username,
        password: hashedPassword,
        name,
        email,
        role: UserRole.ADMIN,
      });

      return this.usersRepository.save(user);
    }

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      name,
      email,
      role: UserRole.USER,
    });

    return this.usersRepository.save(user);
  }
}
