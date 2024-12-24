import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Either, left, right } from '@/core/either';
import { UserNotFoundError } from './errors/user-not-found-error';
import { User } from '../../enterprise/entities/user';

interface GetUserByIdRequest {
  id: string;
}

type GetUserByIdResponse = Either<
  UserNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class GetUserById {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    const { id } = request;
    const user = await this.userRepository.findById(new UniqueEntityID(id));

    if (!user) {
      return left(new UserNotFoundError(id));
    }

    return right({ user });
  }
}
