import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/users/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    await this.authService.register(registerDto);
    return res.status(201).json({
      message: 'User registered successfully',
    });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    console.log('LOGIN DTO', loginDto);
    const { access_token } = await this.authService.login(loginDto);
    console.log('ACCESS TOKEN', access_token);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
      path: '/',
    });

    return res.status(201).json({
      message: 'Login realizado com sucesso',
    });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      path: '/',
    });

    return res.status(201).json({
      message: 'Logout realizado com sucesso',
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request) {
    const token = req.cookies?.['access_token'] as string | undefined;

    if (!token) return { authenticated: false };

    try {
      const payload = this.jwtService.verify<{
        sub: string;
        email: string;
        name: string;
        role: UserRole;
      }>(token);

      return {
        authenticated: true,
        user: {
          id: payload.sub,
          email: payload.email,
          role: payload.role,
          name: payload.name,
        },
      };
    } catch (error) {
      console.log('Token inválido', error);
      return { authenticated: false };
    }
  }
}
