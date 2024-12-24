import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { z } from 'zod';

import { UserPresenter } from '../presenters/user-presenter';
import { Public } from '@/infra/auth/public';
import { CreateUser } from '@/domain/user/application/use-cases/create-user';
import { UserAlreadyExistsError } from '@/domain/user/application/use-cases/errors/user-already-exists-error';

const createUserBodySchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller('/users')
@Public()
export class CreateUserController {
  constructor(private createUser: CreateUser) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(@Body() body: CreateUserBodySchema) {
    const { username, email, password } = body;

    const result = await this.createUser.execute({
      username,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new BadRequestException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { user } = result.value;

    return {
      user: UserPresenter.toHTTP(user),
    };
  }
}
