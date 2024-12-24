import {
  Controller,
  Put,
  Param,
  Body,
  BadRequestException,
  UsePipes,
  UseGuards,
} from '@nestjs/common';

import { UserPresenter } from '../presenters/user-presenter';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { z } from 'zod';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { UpdateUser } from '@/domain/user/application/use-cases/update-user';
import { UserNotFoundError } from '@/domain/user/application/use-cases/errors/user-not-found-error';

const updateUserBodySchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;

@Controller('/users/:id')
@UseGuards(JwtAuthGuard)
export class UpdateUserController {
  constructor(private updateUser: UpdateUser) {}

  @Put()
  @UsePipes(new ZodValidationPipe(updateUserBodySchema))
  async handle(@Param('id') id: string, @Body() body: UpdateUserBodySchema) {
    const { username, email, password } = body;

    const result = await this.updateUser.execute({
      id,
      username,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserNotFoundError:
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
