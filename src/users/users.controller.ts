import {
  Controller,
  Get,
  // Post,
  Body,
  UseGuards,
  Param,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from './user.entity';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    await this.usersService.update(id, updateUserDto);
    return res.status(201).send();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Res() res: Response, @Param('id') id: string) {
    await this.usersService.delete(id);
    return res.status(204).send();
  }
}
