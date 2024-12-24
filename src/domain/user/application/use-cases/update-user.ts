import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../repositories/users-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Either, left, right } from '@/core/either';
import { UserNotFoundError } from './errors/user-not-found-error';
import { User } from '../../enterprise/entities/user';

interface UpdateUserRequest {
  id: string;
  username?: string;
  email?: string;
  password?: string;
}

type UpdateUserResponse = Either<
  UserNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { id, username, email, password } = request;

    const user = await this.userRepository.findById(new UniqueEntityID(id));

    if (!user) {
      return left(new UserNotFoundError(id));
    }

    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    await this.userRepository.update(user);

    return right({ user });
  }
}
