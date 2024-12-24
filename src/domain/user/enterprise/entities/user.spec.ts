import { User } from './user';

describe('User', () => {
  it('should be able to create an user', () => {
    const user = new User({
      username: 'gabrielhijazi',
      email: 'gabrielhijazi@urbano.dev.br',
      password: '123456',
    });

    expect(user).toBeTruthy();
  });
});
