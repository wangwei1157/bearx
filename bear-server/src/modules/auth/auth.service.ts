import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import PasswordHandler from '../../common/decorator/bcrypt.decorator'
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }
  /**
   * 异步验证用户登录信息
   * @param username 用户名
   * @param pass 密码
   * @returns 返回登录结果的Promise
   */

  @PasswordHandler('decrypt')
  async validateUser(username: string, pass: string, type: 'admin' | 'blog'): Promise<any> {
    // 根据用户名查找用户信息
    const user = await this.usersService.findOne(username);

    // 验证用户名和密码是否正确
    if (user && user.password === pass) {
      if (type === 'admin' && user.role != 'super') {
        throw new HttpException('暂无管理员权限', 500);
      }
      console.log(`用户${user.username}登录成功`);
      // 创建负载，包含用户名和用户ID
      const payload = { username: user.username, sub: user.id };
      // 返回登录成功的结果，包括状态码、JWT令牌和成功消息
      return {
        data: { token: this.jwtService.sign(payload) },
        message: '登录成功',
      };
    }
    // 如果用户名或密码错误，返回相应的结果
    throw new HttpException('用户名或密码错误', 500);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
