import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { CreateUser } from '@/domain/user/application/use-cases/create-user';
import { DeleteUser } from '@/domain/user/application/use-cases/delete-user';
import { UpdateUser } from '@/domain/user/application/use-cases/update-user';
import { GetUsers } from '@/domain/user/application/use-cases/get-user';
import { GetUserById } from '@/domain/user/application/use-cases/get-user-by-id';
import { AuthenticateUserUseCase } from '@/domain/user/application/use-cases/authenticate-user';
import { AuthenticateController } from './controllers/authenticate-controller';
import { CreateUserController } from './controllers/create-user-controller';
import { UpdateUserController } from './controllers/update-user-controller';
import { GetUserByIdController } from './controllers/get-user-by-id-controller';
import { GetUsersController } from './controllers/get-users-controller';
import { DeleteUserController } from './controllers/delete-user-controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateUserController,
    UpdateUserController,
    GetUserByIdController,
    GetUsersController,
    DeleteUserController,
  ],
  providers: [
    CreateUser,
    DeleteUser,
    UpdateUser,
    GetUsers,
    GetUserById,
    AuthenticateUserUseCase,
  ],
})
export class HttpModule {}
