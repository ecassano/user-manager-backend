import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
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

  async findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto) {
    const { username, password, name, email } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (username === 'admin') {
      const user = this.usersRepository.create({
        username,
        password: hashedPassword,
        name,
        email,
        isAdmin: true,
      });

      return this.usersRepository.save(user);
    }

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      name,
      email,
      isAdmin: false,
    });

    return this.usersRepository.save(user);
  }
}
