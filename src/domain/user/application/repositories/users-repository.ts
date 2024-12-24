import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { User } from '../../enterprise/entities/user';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByUsername(username: string): Promise<User | null>;
  abstract findById(id: UniqueEntityID): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract create(user: User): Promise<void>;
  abstract update(user: User): Promise<void>;
  abstract delete(id: UniqueEntityID): Promise<void>;
}
