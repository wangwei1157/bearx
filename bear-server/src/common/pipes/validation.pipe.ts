import { HttpException, ValidationPipe } from '@nestjs/common';

export const CustomValidationPipe = new ValidationPipe({
  exceptionFactory: (validationErrors) => {
    const messages = validationErrors.map((error) =>
      Object.values(error.constraints || {}).join(', '),
    );
    console.log('ValidationPipe error:', messages);

    return new HttpException(messages[0], 500);
  },
});
