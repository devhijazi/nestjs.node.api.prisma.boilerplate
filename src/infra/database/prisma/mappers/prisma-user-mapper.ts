import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { User } from '@/domain/user/enterprise/entities/user';
import { Prisma, User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        username: raw.username,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
