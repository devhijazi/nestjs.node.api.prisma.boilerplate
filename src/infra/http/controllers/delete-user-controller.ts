import {
  Controller,
  Delete,
  Param,
  BadRequestException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { DeleteUser } from '@/domain/user/application/use-cases/delete-user';
import { UserNotFoundError } from '@/domain/user/application/use-cases/errors/user-not-found-error';

@Controller('/users/:id')
@UseGuards(JwtAuthGuard)
export class DeleteUserController {
  constructor(private deleteUser: DeleteUser) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const result = await this.deleteUser.execute({ id });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserNotFoundError:
          throw new BadRequestException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
