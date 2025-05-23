import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Public } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import PasswordHandler from 'src/common/decorator/bcrypt.decorator';
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }
  @Public()
  @HttpCode(200)
  @Post('login')
  async adminLogin(@Body() body: LoginDto) {
    return this.authService.validateUser(body.userName, body.password, 'admin');
  }

  @Public()
  @Post('/blogLogin')
  async login(@Body() body) {
    return this.authService.validateUser(body.username, body.password, 'blog');
  }
}
