import {
  Controller,
  Get,
  Param,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UserPresenter } from '../presenters/user-presenter';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { GetUserById } from '@/domain/user/application/use-cases/get-user-by-id';
import { UserNotFoundError } from '@/domain/user/application/use-cases/errors/user-not-found-error';

@Controller('/users/:id')
@UseGuards(JwtAuthGuard)
export class GetUserByIdController {
  constructor(private getUserById: GetUserById) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.getUserById.execute({ id });

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
