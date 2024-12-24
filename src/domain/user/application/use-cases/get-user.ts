import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import { Either, right } from '@/core/either';
import { User } from '../../enterprise/entities/user';

type GetUsersResponse = Either<
  never,
  {
    users: User[];
  }
>;

@Injectable()
export class GetUsers {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<GetUsersResponse> {
    const users = await this.userRepository.findAll();
    return right({ users });
  }
}
