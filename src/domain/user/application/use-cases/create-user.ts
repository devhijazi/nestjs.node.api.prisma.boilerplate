import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import { Either, left, right } from '@/core/either';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { User, UserProps } from '../../enterprise/entities/user';
import { HashGenerator } from '../cryptography/hash-generator';

interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

type CreateUserResponse = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

@Injectable()
export class CreateUser {
  constructor(
    private userRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    username,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const userProps: UserProps = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = User.create(userProps);

    await this.userRepository.create(user);

    return right({
      user,
    });
  }
}
