import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export default function PasswordHandler(operation: 'encrypt' | 'decrypt') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      console.log(args[0]);
      if (operation === 'encrypt') {
        args[0].password = bcrypt.hashSync(args[0].password, 10);
      } else if (operation === 'decrypt') {
        const user = await this.usersService.findOne(args[0]);
        if (user && bcrypt.compareSync(args[1], user.password)) {
          args[1] = user.password; // 解密密码
        }
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
