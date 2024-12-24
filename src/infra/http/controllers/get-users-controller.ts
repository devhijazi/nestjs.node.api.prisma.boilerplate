import { Controller, Get, UseGuards } from '@nestjs/common';

import { UserPresenter } from '../presenters/user-presenter';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { GetUsers } from '@/domain/user/application/use-cases/get-user';

@Controller('/users')
@UseGuards(JwtAuthGuard)
export class GetUsersController {
  constructor(private getUsers: GetUsers) {}

  @Get()
  async handle() {
    const result = await this.getUsers.execute();

    const { users } = result.value;

    return {
      users: users.map(UserPresenter.toHTTP),
    };
  }
}
