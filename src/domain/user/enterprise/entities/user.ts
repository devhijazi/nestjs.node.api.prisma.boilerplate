import { Replace } from '@/helpers/Replace';
import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface UserProps {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Entity<UserProps> {
  constructor(
    props: Replace<UserProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: UniqueEntityID,
  ) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );
  }

  public get username(): string {
    return this.props.username;
  }

  public set username(username: string) {
    this.props.username = username;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id);
    return user;
  }
}
