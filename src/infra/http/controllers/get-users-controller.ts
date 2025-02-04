import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';

import { UserPresenter } from '../presenters/user-presenter';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { GetUsers } from '@/domain/user/application/use-cases/get-user';
import { ExcludePasswordInterceptor } from '@/core/interceptors/exclude-password.interceptor';

@Controller('/users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ExcludePasswordInterceptor)
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
