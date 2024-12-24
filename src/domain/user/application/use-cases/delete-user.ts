import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Either, left, right } from '@/core/either';
import { UserNotFoundError } from './errors/user-not-found-error';

interface DeleteUserRequest {
  id: string;
}

type DeleteUserResponse = Either<
  UserNotFoundError,
  null // No return on success
>;

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    const { id } = request;
    const user = await this.userRepository.findById(new UniqueEntityID(id));

    if (!user) {
      return left(new UserNotFoundError(id));
    }

    await this.userRepository.delete(new UniqueEntityID(id));

    return right(null);
  }
}
