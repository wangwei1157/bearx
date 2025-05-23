import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ForbiddenException,
  Request,
  HttpException,
  UseGuards,
  NotFoundException,
  BadRequestException,
  Headers,
  ExecutionContext,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard, Public } from 'src/modules/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import PasswordHandler from 'src/common/decorator/bcrypt.decorator';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }

  @Public()
  @Post('/create')
  @PasswordHandler('encrypt')
  @ApiOperation({ summary: '创建用户', description: '需提供用户名和密码' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/getUserInfo')
  getUserInfo(@Request() req) {
    let { username, userId } = req.user
    return this.userService.getUserInfo(userId)
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    return this.userService.getUserInfo(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
