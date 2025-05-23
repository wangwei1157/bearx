import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })  // 必填校验
  @IsString({ message: '用户名必须是字符串' })  // 类型校验
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  phone: string;
}
