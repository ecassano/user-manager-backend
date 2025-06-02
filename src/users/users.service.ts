import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto) {
    const { password, name, email } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (email.endsWith('@conectar.com.br')) {
      const user = this.usersRepository.create({
        password: hashedPassword,
        name,
        email,
        role: UserRole.ADMIN,
        createdAt: new Date(),
      });

      return this.usersRepository.save(user);
    }

    const user = this.usersRepository.create({
      password: hashedPassword,
      name,
      email,
      role: UserRole.USER,
      createdAt: new Date(),
    });

    return this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { name, email, password } = updateUserDto;

    user.name = name;
    user.email = email;
    user.password = password;
    user.updatedAt = new Date();
    return this.usersRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.delete(id);
  }
}
